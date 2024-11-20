import os

folder_path = r"C:\Users\developer\Desktop\proiect\my-app\backend"
file_path = os.path.join(folder_path, "cached_summary.txt")


try:
    os.makedirs(folder_path, exist_ok=True)


    with open(file_path, "w", encoding="utf-8") as file:
        file.write("this is a test")
    print("File created succeffuly at {file_path}")
except Exception as e:
    print(f"Error creating file at {file_path}: {e}")