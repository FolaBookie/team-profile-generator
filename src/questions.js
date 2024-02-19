const EMAIL_REGEX_VALIDATOR =
  /^[\w-]+(?:\.[\w-]+)*@([a-zA-Z0-9-]+\.)*[a-zA-Z]{2,}$/;

const OPTIONAL_QUESTIONS = {
  engineer: {
    type: "input",
    message: "What is the github username of the engineer?",
    name: "github",
    validate: (value) => {
      if (!value) {
        return "Please enter a valid value to continue";
      }
      return true;
    },
  },
  intern: {
    type: "input",
    message: "What is the name of the intern school?",
    name: "school",
    validate: (value) => {
      if (!value) {
        return "Please enter a valid value to continue";
      }
      return true;
    },
  },
};

function getManagerQuestions() {
  return [
    {
      type: "input",
      message: "What is the name of the team manager?",
      name: "name",
      validate: (value) => {
        if (!value) {
          return "Please enter a value to continue";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is employee ID of the team manager?",
      name: "id",
      validate: (value) => {
        if (!value) {
          return "Please enter a value to continue";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is the email address of the team manager?",
      name: "email",
      validate: (value) => {
        if (!value || !EMAIL_REGEX_VALIDATOR.test(value)) {
          return "Please enter a valid value to continue";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "What is the office number of the team manager?",
      name: "officeNumber",
      validate: (value) => {
        if (!value || isNaN(value)) {
          return "Please enter a valid value to continue";
        }
        return true;
      },
    },
  ];
}

function generateQuestions(type) {
  const commonQuestion = [
    {
      type: "input",
      message: `What is the name of the ${type}?`,
      name: "name",
      validate: (value) => {
        if (!value) {
          return "Please enter a value to continue";
        }
        return true;
      },
    },
    {
      type: "input",
      message: `What is the employee ID of the ${type}?`,
      name: "id",
      validate: (value) => {
        if (!value) {
          return "Please enter a value to continue";
        }
        return true;
      },
    },
    {
      type: "input",
      message: `What is the email address of the ${type}?`,
      name: "email",
      validate: (value) => {
        if (!value || !EMAIL_REGEX_VALIDATOR.test(value)) {
          return "Please enter a valid value to continue";
        }
        return true;
      },
    },
  ];
  commonQuestion.push(OPTIONAL_QUESTIONS[type]);
  return commonQuestion;
}

module.exports = {
  generateQuestions,
  getManagerQuestions,
};
