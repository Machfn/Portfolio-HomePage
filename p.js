window.onload = () => {
    // html items
    let currentInput = document.getElementById("currentCommand");
    currentInput.focus();
    let consoleArea = document.getElementById("terminal-body");
    let controller = new AbortController();
    let signal = controller.signal;
    //let inputBar = `<p class="dire">portfolio@benon.ca:~/<input type="text" name="cmdLine" class="usrCommand" id="currentCommand" ></p>`
    const commands = ["projects"]

    const updateInput = () => {
        controller.abort();
        controller = new AbortController();
        signal = controller.signal;
        currentInput = document.getElementById("currentCommand");
        currentInput.addEventListener("keyup", (event) => {
            if (event.key == "Enter") {
                event.preventDefault();
                runCommand(event.target.value);
            }
        }, { signal });
        currentInput.focus();
    }


    const help = () => {
        let menu = document.createElement("p");
        menu.style.whiteSpace = 'pre-wrap';
        menu.textContent = `Commands:\nportfolio\nflags: \n\t-help - displays help menu\n\t-projects - links the projects I am currently working on\n\t-accounts - links all my social accounts\n\t-showcase - redirects to my project showcase`
        consoleArea.appendChild(menu);
    }

    const newRunLine = () => {
        inputBar = document.createElement('p');
        inputBar.className = "dire";
        inputBar.textContent = "portfolio@benon.ca:~/";
        inpT = document.createElement('input');
        inpT.type = "text";
        inpT.name = "cmdLine";
        inpT.className = "usrCommand";
        inpT.id = "currentCommand";
        inputBar.appendChild(inpT);
        currentInput.id = "oldInput";
        consoleArea.appendChild(inputBar);
        updateInput();
    }

    const showProjects = () => {
        const projects = ["Open Directory"];
        const projectLinks = ["https://github.com/Machfn/OpenDirectory/tree/main"];
        let listP = document.createElement('p');
        listP.style.whiteSpace = 'pre-wrap';
        for (i in projects){
            lP = document.createElement('a');
            lP.href = projectLinks[i];
            lP.className = "linkedP";
            lP.textContent = `${projects[i]} \n`;
            listP.appendChild(lP);
        }
        consoleArea.appendChild(listP);
    }

    const showAccounts = () => {
        const accounts = ["LinkedIn", "GitHub"];
        const links = ["www.linkedin.com/in/ben-warkentin-779343386","https://github.com/Machfn/"];
        let listA = document.createElement("p");
        listA.style.whiteSpace = "pre-wrap";
        for (i in accounts) {
            lA = document.createElement('a');
            lA.href = links[i];
            lA.className = "linkedP";
            lA.textContent = `${accounts[i]} \n`;
            listA.appendChild(lA);
        }
        consoleArea.appendChild(listA);
    }

    const runCommand = (cmmd) => {
        splitCommands = cmmd.split(" ");
        // console.log(splitCommands);
        if (splitCommands[0] == "") {
            newRunLine();
        } else if (splitCommands[0] == "clear") {
            consoleArea.innerHTML = "";
            newRunLine();
        } else if (splitCommands[0] != "portfolio") {
            errorMsg = document.createElement('p');
            errorMsg.textContent = `No Such Command: "${splitCommands[0]}"`;
            errorMsg.className = "error-msg"
            consoleArea.appendChild(errorMsg)
            //maybe switch old input to text
            newRunLine();
        } else if (splitCommands.length == 1) {
            errorMsg = document.createElement('p');
            errorMsg.textContent = `portfolio: no flags specified`;
            errorMsg.className = "error-msg"
            consoleArea.appendChild(errorMsg)
            //maybe switch old input to text
            newRunLine();
        } else {
            for (let i=1; i<splitCommands.length; i++) {
                selectCmd = splitCommands[i];
                if (selectCmd == "-help") {
                    console.log("help command");
                    help();
                } else if (selectCmd == "-projects") {
                    console.log("projects command");
                    showProjects();
                } else if (selectCmd == "-accounts") {
                    console.log("showing accounts");
                    showAccounts();
                }
            }
            newRunLine();
        }
    }


    //event listner for user input on console
    currentInput.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            event.preventDefault();
            runCommand(event.target.value);
        }
    }, { signal });

}
