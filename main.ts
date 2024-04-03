#! /usr/bin/env node
import inquirer from "inquirer";

type userType = {
  name: string;
  pin: number;
  balance: number;
};

let user: userType = {
  name: "hamza",
  pin: 1122,
  balance: 100000,
};

let loggedIn = false;

while (!loggedIn) {
  const respo = await inquirer.prompt([
    {
      message: "Enter your pin code",
      name: "pin",
      type: "password",
    },
  ]);

  if (Number(respo.pin) !== user.pin) {
    console.log("You have entered an incorrect pin. Please try again.");
  } else {
    loggedIn = true;
    console.log(`Your PIN code is correct. You have successfully logged in\nYou have ${user.balance} money in your account`);

    const transactionRespo = await inquirer.prompt([
      {
        name: "selectedType",
        message: "please select an option",
        type: "list",
        choices: ["Withdraw", "Fast Cash", "Balance Inquiry"], // TODO add more options deposit and bill payment
      },
      //TODO amount should be multiple of 500
      {
        name: "amount",
        message: "Please Select Your Amount",
        type: "list",
        choices: ["500", "1000", "2000", "3000", "5000", "10000"],
        when(respo) {
          return respo.selectedType == "Fast Cash";
        },
      },
      {
        name: "amount",
        message: "Please Enter Your Amount",
        when(respo) {
          return respo.selectedType == "Withdraw";
        },
      },
    ]);
    if (transactionRespo.selectedType == "Balance Inquiry") {
      if (transactionRespo.amount >= -1) {
        user.balance = user.balance - transactionRespo.amount;
        console.log(`Your New Balance Is : ${user.balance}`);
      } else {
        console.log(`Your Balance Is : ${user.balance}`);
        // console.log("You have insufficient funds to withdraw from the ATM");
      }
    } else if (transactionRespo.selectedType == "Withdraw" || transactionRespo.selectedType == "Fast Cash") {
      if (transactionRespo.amount <= user.balance) { // Checking if user has enough balance
        user.balance = user.balance - transactionRespo.amount;
        console.log(`Your New Balance Is : ${user.balance}`);
      } else {
        console.log("You have insufficient funds to withdraw from the ATM");
      }
    }
  }
}