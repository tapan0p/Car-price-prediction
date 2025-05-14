"""
Author: Tapan Mahata
Email: mahatatapan2000@gmail.com

Description:
    This script implements a Random Forest Regressor that can handle botth categorical and numerical features.
    It uses bootstrapping and parallel processing to train multiple trees.
    The trees are trained independently and the final prediction is the average of the predictions from all trees.
"""

import numpy as np
import pandas as pd
from sklearn.utils import resample
from joblib import Parallel, delayed
from regression_tree import RegressionTree



class RandomForestRegressor:
    def __init__(self, n_estimators=100, max_depth=5, min_samples_split=5, max_features=None, n_jobs=-1):
        """
        This class represents a random forest regressor with parallel processing.

        Parameters:
        - n_estimators: number of trees in the forest
        - max_depth: maximum depth of each tree
        - min_samples_split: minimum number of samples required to split a node
        - max_features: number of features to consider for each split (integer or None for all features)
        - n_jobs: number of jobs to run in parallel (-1 means use all available cores)
        """
        if max_features is not None and (not isinstance(max_features, int) or max_features <= 0):
            raise ValueError("max_features must be a positive integer or None")
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.max_features = max_features
        self.n_jobs = n_jobs
        self.trees = []
        
    def _train_tree(self, X, y, max_features):
        """
        This method trains a single decision tree using bootstrapping.

        Parameters:
        - X: the training features
        - y: the target variable
        - max_features: number of features to consider for each split (integer or None for all features)

        Returns:
        - The trained decision tree.
        """
        
        # Bootstrap sample
        X_sample, y_sample = resample(X, y, n_samples=X.shape[0])
        
        # Create and fit tree
        tree = RegressionTree(
            max_depth=self.max_depth,
            min_samples_split=self.min_samples_split
        )
        
        # Set max_features for the tree
        tree.max_features = max_features
        
        # Fit the tree
        tree.fit(X_sample, y_sample)
        return tree
    
    def fit(self, X, y):
        """
        This method fits the random forest to the training data with parallel processing.

        Parameters:
        - X: the training features
        - y: the target variable
        """
        
        self.trees = []
        n_features = X.shape[1]
        
        # Determine the number of features to consider for each split
        if self.max_features is None:
            max_features = n_features
        else:
            max_features = min(self.max_features, n_features)
        
        # Train trees in parallel
        self.trees = Parallel(n_jobs=self.n_jobs)(
            delayed(self._train_tree)(X, y, max_features)
            for _ in range(self.n_estimators)
        )
    
    def predict(self, X):
        """
        This method predicts the target variable for the given input data.

        Parameters:
        - X: the input as a batch of data.

        Returns:
        - The predicted values.
        """
        if isinstance(X, np.ndarray):
            X = pd.DataFrame(X)
        predictions = np.array([tree.predict(X) for tree in self.trees])
        return np.mean(predictions, axis=0)