// Dummy user data
export const DUMMY_USERS = {
  intern: {
    bscid: "1234567",
    password: "password123",
  },
  manager: {
    bscid: "7654321",
    password: "password123",
  },
};

export const BSCID_INTERN = DUMMY_USERS.intern.bscid;
export const BSCID_MANAGER = DUMMY_USERS.manager.bscid;

// Dummy data for last and current pay periods
export const LAST_PAY_PERIOD_DATA = [
  { in: "8:57 AM", out: "5:03 PM", adjustment: "No" },
  { in: "9:12 AM", out: "5:17 PM", adjustment: "No" },
  { in: "10:01 AM", out: "6:04 PM", adjustment: "No" },
  { in: "9:08 AM", out: "4:58 PM", adjustment: "No" },
  { in: "9:26 AM", out: "5:25 PM", adjustment: "No" },
  { in: "10:14 AM", out: "6:09 PM", adjustment: "No" },
  { in: "9:05 AM", out: "5:02 PM", adjustment: "No" },
  { in: "9:34 AM", out: "5:38 PM", adjustment: "No" },
  { in: "10:08 AM", out: "6:12 PM", adjustment: "No" },
  { in: "8:53 AM", out: "5:06 PM", adjustment: "No" },
  { in: "9:18 AM", out: "5:23 PM", adjustment: "No" },
  { in: "10:06 AM", out: "6:11 PM", adjustment: "No" },
  { in: "8:59 AM", out: "4:56 PM", adjustment: "No" },
  { in: "9:21 AM", out: "5:35 PM", adjustment: "No" },
];

export const CURRENT_PAY_PERIOD_DATA = [
  { in: "9:02 AM", out: "5:07 PM", adjustment: "No" },
  { in: "", out: "", adjustment: "Yes" },
  { in: "10:05 AM", out: "6:08 PM", adjustment: "No" },
  { in: "9:12 AM", out: "5:14 PM", adjustment: "No" },
  { in: "", out: "", adjustment: "Yes" },
  { in: "10:10 AM", out: "6:15 PM", adjustment: "No" },
  { in: "9:07 AM", out: "5:01 PM", adjustment: "No" },
  { in: "", out: "", adjustment: "Yes" },
  { in: "10:09 AM", out: "6:13 PM", adjustment: "No" },
];
