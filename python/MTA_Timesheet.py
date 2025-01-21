import pandas as pd
from openpyxl import load_workbook
import re  # For regex-based date validation
import json  # For returning structured output

# Load the Excel file
def process_timesheet(file_path):
    wb = load_workbook(file_path, data_only=True)
    sheet = wb['MTA Internship Timesheet']

    # Map yellow-highlighted fields to their actual labels
    yellow_fields = {
        'Intern/Fellow Name': sheet['E4'].value,
        'BSCID': sheet['H4'].value,
        'Pass No.': sheet['H6'].value,
        'Intern/Fellow Name (Signature Section)': sheet['B25'].value,
        'Intern/Fellow Signature': sheet['E25'].value,
        'Date (Intern/Fellow Signature Section)': sheet['H25'].value,
        'Manager Name': sheet['B27'].value,
        'Manager Signature': sheet['E27'].value,
        'Date (Manager Signature Section)': sheet['H27'].value,
        'Total No. of Hours for the Pay Period': sheet['H22'].value
    }

    # Validate yellow-highlighted fields
    missing_fields = [field for field, value in yellow_fields.items() if value is None or value == ""]

    # Column mapping (Excel letter → Column Name)
    column_mapping = {
        "A": "Date",
        "B": "Pay Code",
        "C": "Pay Rate",
        "D": "In",
        "E": "Out",
        "F": "Daily No. of Hours Worked",
        "G": "Tally of Total Hours Worked",
        "H": "Adjustment Justification"
    }

    # Function to check if a value is a valid date
    def is_valid_date(value):
        if value is None or value == "":
            return False
        if isinstance(value, (int, float)):  # Excel sometimes stores dates as numbers
            return True
        if isinstance(value, str):
            value = value.strip()
            if re.match(r"^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/\d{4}$", value):
                return True
        return False

    # Validate timesheet entries (A9:H22)
    timesheet_rows = []
    timesheet_errors = []

    for row in range(9, 23):  # From row 9 to row 22 (Excel row indexes)
        row_values = {col: sheet[f"{col}{row}"].value for col in "ABCDEFGH"}
        date_value = row_values["A"]
        if isinstance(date_value, str):
            date_parts = date_value.split("\n")
            date_value = next((part for part in date_parts if is_valid_date(part)), None)
        row_values["A"] = date_value

        if all(value is None or value == "" for value in row_values.values()):
            continue  

        missing_columns = [column_mapping[col] for col, value in row_values.items() if value is None or value == ""]
        if missing_columns:
            timesheet_errors.append(f"Row {row}: Missing {', '.join(missing_columns)}")

        if not missing_columns:
            timesheet_rows.append({
                "date": row_values["A"],
                "in": row_values["D"],
                "out": row_values["E"],
                "adjustment": row_values["H"] or "No",
                "hours": row_values["F"]
            })

    return json.dumps({
        "status": "success" if not missing_fields and not timesheet_errors else "error",
        "missing_fields": missing_fields,
        "timesheet_errors": timesheet_errors,
        "timesheet_rows": timesheet_rows
    })
