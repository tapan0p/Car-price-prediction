"""
Author: Tapan Mahata
Email: mahatatapan2000@gmail.com

Description:
    This script implements a decision tree for regression that can handle botth categorical and numerical features.
"""

import pandas as pd
import numpy as np
class Node:
    def __init__(self, value=None, feature_index=None, threshold=None, left=None, right=None):
        """
        This class represents a node in the decision tree.

        Parameters:
        - value: the predicted value at this node (if it's a leaf node)
        - feature_index: the index of the feature used for splitting at this node
        - threshold: the threshold value for splitting at this node
        - left: the left child node
        - right: the right child node
        """
        self.value = value
        self.feature_index = feature_index
        self.threshold = threshold
        self.left = left
        self.right = right

class RegressionTree:
    def __init__(self, max_depth=5, min_samples_split=5):
        """
        This class represents a decision tree for regression.

        Parameters:
        - max_depth: maximum depth of the tree
        - min_samples_split: minimum number of samples required to split an internal node
        """
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.root = None
        self.max_features = None

    def fit(self, X, y):
        """
        This method fits the decision tree to the training data.

        Parameters:
        - X: the training features
        - y: the target variable
        """
        self.n_features = X.shape[1]
        self.root = self._split_node(X, y, 0)

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
        return X.apply(self._predict_row, axis=1)

    def _split_node(self, X, y, depth):
        """
        This method recursively splits the nodes of the tree until it reaches the maximum depth or minimum samples split.

        Parameters:
        - X: the training features
        - y: the target variable
        - depth: the current depth of the tree

        Returns:
        - The root node of the tree.
        """
        n_samples = X.shape[0]

        if depth >= self.max_depth or n_samples < self.min_samples_split:
            leaf_value = y.mean()
            return Node(value=leaf_value)
        
        best_feature_index, best_threshold = self._find_best_split(X, y)

        if best_feature_index is None:
            leaf_value = y.mean()
            return Node(value=leaf_value)
        
        feature = X.iloc[:, best_feature_index]
        if isinstance(best_threshold, set):
            left_idx = feature.isin(best_threshold)
            right_idx = ~left_idx
        else:
            left_idx = feature <= best_threshold
            right_idx = feature > best_threshold

        left_child = self._split_node(X[left_idx], y[left_idx], depth + 1)
        right_child = self._split_node(X[right_idx], y[right_idx], depth + 1)

        return Node(feature_index=best_feature_index, threshold=best_threshold, left=left_child, right=right_child)
    
    def _find_best_split(self, X, y):
        """
        This method finds the best feature and threshold to split the data.

        Parameters:
        - X: the training features
        - y: the target variable

        Returns:
        - The best feature index and threshold.
        """
        best_mse = np.inf
        best_feature_index = None
        best_threshold = None
        best_is_categorical = False

        feature_indices = np.arange(self.n_features)
        if self.max_features is not None:
            n_features_to_consider = min(self.max_features, self.n_features)
            feature_indices = np.random.choice(self.n_features, size=n_features_to_consider, replace=False)

        for feature_index in feature_indices:
            feature = X.iloc[:, feature_index]
            is_categorical = feature.dtype.name == 'category' or feature.dtype == 'object'
            
            if is_categorical:
                category_means = y.groupby(feature, observed=True).mean()  # Change to observed=False if needed
                sorted_categories = category_means.sort_values().index.tolist()

                for i in range(1, len(sorted_categories)):
                    left_categories = set(sorted_categories[:i])
                    left_idx = feature.isin(left_categories)
                    right_idx = ~left_idx

                    if left_idx.sum() == 0 or right_idx.sum() == 0:
                        continue

                    y_left = y[left_idx]
                    y_right = y[right_idx]
                    mse = (len(y_left) * y_left.var() + len(y_right) * y_right.var()) / len(y)
                    if mse < best_mse:
                        best_mse = mse 
                        best_feature_index = feature_index 
                        best_threshold = left_categories
                        best_is_categorical = True
            else:
                unique_values = np.unique(feature)

                for threshold in unique_values:
                    left_idx = feature <= threshold
                    right_idx = feature > threshold

                    if left_idx.sum() == 0 or right_idx.sum() == 0:
                        continue

                    y_left = y[left_idx]
                    y_right = y[right_idx]
                    mse = (len(y_left) * y_left.var() + len(y_right) * y_right.var()) / len(y)

                    if mse < best_mse:
                        best_mse = mse 
                        best_feature_index = feature_index 
                        best_threshold = threshold
                        best_is_categorical = False

        self.best_is_categorical = best_is_categorical
        return best_feature_index, best_threshold    
    
    def _predict_row(self, row):
        """
        This method predicts the target variable for a single row of input data.

        Parameters:
        - row: a single row of input data.

        Returns:
        - The predicted value.
        """
        node = self.root 

        while node.value is None:
            val = row.iloc[node.feature_index]
            if isinstance(node.threshold, set):
                if val in node.threshold:
                    node = node.left 
                else:
                    node = node.right 
            else:
                if val <= node.threshold:
                    node = node.left 
                else:
                    node = node.right

        return node.value