import os
import pandas as pd
import json
from datetime import datetime

DATA_DIR = '../data'
OUTPUT_DIR = '../database/json'

def convert_value(value):
    if isinstance(value, (datetime, pd.Timestamp)):
        return value.strftime('%Y-%m-%d %H:%M:%S')
    if pd.isna(value):
        return None
    return value

def main():
    try:
        os.makedirs(OUTPUT_DIR, exist_ok=True)

        for filename in os.listdir(DATA_DIR):
            if filename.endswith('.xlsx'):
                filepath = os.path.join(DATA_DIR, filename)
                print(f'讀取檔案：{filepath}')

                df = pd.read_excel(filepath, header=1)
                df = df.applymap(convert_value)

                table_name = os.path.splitext(filename)[0]
                output_filename = f"{table_name}.json"
                output_path = os.path.join(OUTPUT_DIR, output_filename)

                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(df.to_dict(orient='records'), f, ensure_ascii=False, indent=2)

                print(f'JSON 已匯出至 {output_path}')

        print("所有檔案處理完成。")
        input("按任一鍵關閉程式...")

    except Exception as e:
        print("發生錯誤：", str(e))
        input("請按任一鍵關閉程式...")

if __name__ == '__main__':
    main()
