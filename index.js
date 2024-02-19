const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const {
    generateQuestions,
    getManagerQuestions,
  } = require("./src/questions.js");
  
  const prompts = inquirer.createPromptModule();
  
  async function getManagerAnswers() {
    return prompts(getManagerQuestions())
      .then((answers) => answers)
      .catch((error) => console.log(error));
  }
  
  async function addNewTeamMember(currentTeamMembers = []) {
    return new Promise((resolve, reject) => {
      prompts({
        type: "list",
        message: "Do you want to add another employee",
        name: "employee_type",
        validate: (value) => {
          if (!value) {
            return "Please enter a value to continue";
          }
          return true;
        },
        choices: ["Add an engineer", "Add an intern", "Finish building the team"],
      })
        .then(async ({ employee_type }) => {
          if (employee_type === "Finish building the team") {
            resolve(currentTeamMembers);
          }
  
          if (employee_type === "Add an engineer") {
            const memberDetails = await getAdditionalTeamMemberDetails(
              "engineer"
            );
            const newEngineerTeamMember = new Engineer(
              memberDetails.name,
              memberDetails.id,
              memberDetails.email,
              memberDetails.github
            );
            currentTeamMembers.push(newEngineerTeamMember);
            resolve(addNewTeamMember(currentTeamMembers));
          }
  
          if (employee_type === "Add an intern") {
            const memberDetails = await getAdditionalTeamMemberDetails("intern");
            const newEngineerTeamMember = new Intern(
              memberDetails.name,
              memberDetails.id,
              memberDetails.email,
              memberDetails.school
            );
            currentTeamMembers.push(newEngineerTeamMember);
            resolve(addNewTeamMember(currentTeamMembers));
          }
        })
        .catch((error) => reject(error));
    });
  }
  
  async function getAdditionalTeamMemberDetails(type) {
    const questions = generateQuestions(type);
    return prompts(questions)
      .then((answers) => answers)
      .catch((error) => console.log(error));
  }
  
  async function getTeamMembersObject() {
    const managerInformation = await getManagerAnswers();
    const teamManager = new Manager(
      managerInformation.name,
      managerInformation.id,
      managerInformation.email,
      managerInformation.officeNumber
    );
    const otherTeamMembers = await addNewTeamMember([]);
  
    return [teamManager, ...otherTeamMembers];
  }
  
  function saveHTMLTemplate(team) {
    const template = render(team);
  
    // Create the directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
  
    fs.writeFile(outputPath, template, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("File generated successfully");
    });
  }
  
  async function initApp() {
    const team = await getTeamMembersObject();
    saveHTMLTemplate(team);
  }
  
  initApp();
  

