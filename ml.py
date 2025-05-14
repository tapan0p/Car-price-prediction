import argparse
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
from random_forest import RandomForestRegressor
import os

def main(args):
    print("Loading dataset ...")
    df = pd.read_csv(args.data_path).drop(columns=['Unnamed: 0'])
    categorical_cols = ['Car Name', 'Fuel', 'Location', 'Drive' , 'Type']
    for col in categorical_cols:
        df[col] = df[col].astype('category')
        
    X = df.iloc[:,:-1]
    y = df.iloc[:,-1]
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train the Random Forest
    rf = RandomForestRegressor(
        n_estimators=args.n,
        max_depth=args.max_depth,
        min_samples_split=args.min_samples_split,
        max_features=args.max_features,
        n_jobs=args.n_jobs,
    )

    
    # Train
    print('Training model ...')
    rf.fit(X_train, y_train)

    # Predict
    print('Predicting...')
    predictions = rf.predict(X_test)

    # Evaluate
    mae = mean_absolute_error(y_test, predictions)
    r2_score_value = r2_score(y_test, predictions)
    print(f"Test R^2: {r2_score_value}")
    print(f"Test MAE: {mae}")

    # Save the trained Random Forest model
    print('Saving model...')
    # create a folder named model if not exists
    os.makedirs('model', exist_ok=True)
    joblib.dump(rf, 'model/random_forest_model.joblib')
    print('Model saved!')
    


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--data_path', type=str, default='Dataset/preprocessed_data.csv')
    parser.add_argument('--n', type=int, default=50)
    parser.add_argument('--max_depth', type=int, default=8)
    parser.add_argument('--min_samples_split', type=int, default=5)
    parser.add_argument('--max_features', type=int, default=5)
    parser.add_argument('--n_jobs', type=int, default=-1)
    args = parser.parse_args()
    main(args)
    