async function generateAnswer() {

    const topic = document.getElementById("topic").value;
    const difficulty = document.getElementById("difficulty").value;
    const task = document.getElementById("task").value;
    const promptStyle = document.getElementById("promptStyle").value;

    if (topic.trim() === "") {
        alert("Please enter a topic.");
        return;
    }

    let prompt = "";

    // ==========================================
    // EXPLAIN TOPIC
    // ==========================================

    if (task === "explain") {

        if (promptStyle === "basic") {

            prompt = `
Explain ${topic} in simple English.
The student is at ${difficulty} level.
Give a simple example.
`;

        } else if (promptStyle === "structured") {

            prompt = `
You are an expert computer science teacher.

Explain the following topic to a ${difficulty} student.

Topic: ${topic}

Follow this structure:

1. Simple definition
2. Why it is used
3. How it works
4. Simple example
5. Real-world analogy
6. Common mistakes
7. Three practice questions

Use simple English.
Do not assume the student already knows the topic.
`;

        } else if (promptStyle === "expert") {

            prompt = `
Act as an experienced computer science professor.

Teach the following topic to a ${difficulty} student:

Topic: ${topic}

Provide a detailed but easy-to-understand explanation.

Follow this structure:

1. Start with intuition
2. Formal definition
3. How it works step by step
4. Detailed example
5. Dry run
6. Real-world application
7. Common mistakes
8. Time complexity if applicable
9. Space complexity if applicable
10. Compare with a related concept
11. Three exam-level questions

Use precise technical terminology but explain difficult terms in simple English.
`;

        }

    }

    // ==========================================
    // GENERATE NOTES
    // ==========================================

    else if (task === "notes") {

        if (promptStyle === "basic") {

            prompt = `
Give short study notes about ${topic}.

The student is at ${difficulty} level.

Include the definition, important points, and one example.
`;

        } else if (promptStyle === "structured") {

            prompt = `
You are an expert teacher.

Create short and easy-to-revise study notes.

Topic: ${topic}

Difficulty: ${difficulty}

Include:

1. Definition
2. Important points
3. Key concepts
4. Example
5. Advantages
6. Disadvantages
7. Important exam points

Use simple English.
Keep the notes concise.
`;

        } else if (promptStyle === "expert") {

            prompt = `
Act as an experienced computer science professor.

Create high-quality revision notes about:

Topic: ${topic}

Student level: ${difficulty}

Organize the answer using clear headings.

Include:

1. Core definition
2. Fundamental concepts
3. Important properties
4. Step-by-step working
5. Example
6. Advantages
7. Disadvantages
8. Complexity analysis
9. Common misconceptions
10. Important examination points
11. Quick revision summary

Use technically accurate language while keeping explanations understandable.
`;

        }

    }

    // ==========================================
    // GENERATE QUIZ
    // ==========================================

    else if (task === "quiz") {

        if (promptStyle === "basic") {

            prompt = `
Create 5 simple multiple-choice questions about ${topic}.

Difficulty: ${difficulty}.

Give the correct answer after each question.
`;

        } else if (promptStyle === "structured") {

            prompt = `
You are an expert quiz creator.

Create a quiz about:

Topic: ${topic}

Difficulty: ${difficulty}

Create 5 multiple-choice questions.

For each question provide:

Question
A
B
C
D
Correct Answer
Short Explanation

Do not make the questions unnecessarily complicated.
`;

        } else if (promptStyle === "expert") {

            prompt = `
Act as an experienced technical examiner.

Create 5 high-quality multiple-choice questions about:

Topic: ${topic}

Difficulty: ${difficulty}

Test different levels of understanding.

Include:

- Conceptual questions
- Application-based questions
- One problem-solving question
- One question involving common mistakes

For every question provide:

Question
A
B
C
D
Correct Answer
Detailed Explanation

Avoid ambiguous questions.
`;

        }

    }

    // ==========================================
    // EXPLAIN CODE
    // ==========================================

    else if (task === "code") {

        const code = document.getElementById("code").value;

        if (code.trim() === "") {
            alert("Please enter your code.");
            return;
        }

        if (promptStyle === "basic") {

            prompt = `
Explain this code in simple English.

Topic: ${topic}

Code:

${code}

Tell me:

1. What the code does
2. How it works
3. The output
`;

        } else if (promptStyle === "structured") {

            prompt = `
You are an expert programming teacher.

Explain the following code to a ${difficulty} student.

Topic: ${topic}

Code:

${code}

Follow this structure:

1. What does this program do?
2. Explain the logic step by step.
3. Explain the important lines.
4. Give a simple example.
5. Perform a dry run.
6. Give time complexity.
7. Give space complexity.
8. Identify possible mistakes.
9. Give three practice questions.

Rules:

- Use simple English.
- Do not assume advanced programming knowledge.
- Explain difficult terms.
- Do not unnecessarily rewrite the entire program.
`;

        } else if (promptStyle === "expert") {

            prompt = `
Act as an experienced programming professor and code reviewer.

Analyze the following program:

Topic: ${topic}

Difficulty: ${difficulty}

Code:

${code}

Provide a detailed analysis using this structure:

1. Purpose of the program
2. Overall algorithm
3. Step-by-step logic
4. Important lines
5. Variable and data structure explanation
6. Detailed dry run
7. Expected output
8. Time complexity
9. Space complexity
10. Possible edge cases
11. Common mistakes
12. Possible improvements
13. Three interview-level questions

Use technically accurate language but explain difficult concepts clearly.
`;

        }

    }


    // ==========================================
    // SHOW LOADING
    // ==========================================

    document.getElementById("loading").style.display = "block";

    document.getElementById("answer").textContent = "";
    document.getElementById("promptPreview").textContent = prompt;


    // ==========================================
    // SEND PROMPT TO OLLAMA
    // ==========================================

    try {

        const response = await fetch("/ask-ai", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: prompt
            })

        });

        const data = await response.json();

        document.getElementById("answer").textContent =
            data.answer || data.error;
           const analysis = document.getElementById("promptAnalysis");

if (promptStyle === "basic") {

    analysis.innerHTML = `
        <strong>Prompt Style: Basic</strong>

        <br><br>

        • Simple instruction<br>
        • Minimal context<br>
        • Quick and direct response<br>
        • Suitable for simple questions
    `;

} else if (promptStyle === "structured") {

    analysis.innerHTML = `
        <strong>Prompt Style: Structured</strong>

        <br><br>

        ✓ Role specified<br>
        ✓ Student difficulty specified<br>
        ✓ Clear instructions<br>
        ✓ Output structure specified<br>
        ✓ Simple English requested
    `;

} else if (promptStyle === "expert") {

    analysis.innerHTML = `
        <strong>Prompt Style: Expert</strong>

        <br><br>

        ✓ Expert role specified<br>
        ✓ Detailed context provided<br>
        ✓ Step-by-step requirements<br>
        ✓ Complexity analysis requested<br>
        ✓ Edge cases included<br>
        ✓ Exam/interview focus
    `;
}
            
    } catch (error) {

        document.getElementById("answer").textContent =
            "Unable to connect to the AI.";

        console.error(error);

    }


    // ==========================================
    // HIDE LOADING
    // ==========================================

    document.getElementById("loading").style.display = "none";
}


// ==========================================
// SHOW / HIDE CODE BOX
// ==========================================

document.getElementById("task").addEventListener("change", function () {

    const codeSection = document.getElementById("codeSection");

    if (this.value === "code") {

        codeSection.style.display = "block";

    } else {

        codeSection.style.display = "none";

    }

});

async function comparePrompts() {

    const topic = document.getElementById("topic").value;
    const difficulty = document.getElementById("difficulty").value;

    if (topic.trim() === "") {

        alert("Please enter a topic first.");
        return;

    }

    const comparisonResult =
        document.getElementById("comparisonResult");

    comparisonResult.textContent = "Generating comparison...";


    const basicPrompt = `
Explain ${topic} in simple English
for a ${difficulty} student.
Give a simple example.
`;


    const structuredPrompt = `
You are an expert computer science teacher.

Explain ${topic} to a ${difficulty} student.

Follow this structure:

1. Simple definition
2. Why it is used
3. How it works
4. Simple example
5. Real-world analogy
6. Common mistakes
7. Three practice questions

Use simple English.
`;


    const expertPrompt = `
Act as an experienced computer science professor.

Teach ${topic} to a ${difficulty} student.

Provide:

1. Intuition
2. Formal definition
3. Step-by-step explanation
4. Detailed example
5. Dry run
6. Real-world application
7. Common mistakes
8. Time complexity
9. Space complexity
10. Comparison with a related concept
11. Three exam-level questions

Use precise but beginner-friendly language.
`;


    comparisonResult.innerHTML = `

        <h3>Basic Prompt</h3>

        <pre>${basicPrompt}</pre>


        <h3>Structured Prompt</h3>

        <pre>${structuredPrompt}</pre>


        <h3>Expert Prompt</h3>

        <pre>${expertPrompt}</pre>

    `;
}

async function clarifyDoubt() {

    const topic =
        document.getElementById("topic").value;

    const doubt =
        document.getElementById("doubt").value;

    const previousAnswer =
        document.getElementById("answer").textContent;


    // Check topic

    if (topic.trim() === "") {

        alert("Please generate an answer first.");

        return;
    }


    // Check previous answer

    if (
        previousAnswer.trim() === "" ||
        previousAnswer.includes("Your answer will appear here")
    ) {

        alert("Please generate an answer first.");

        return;
    }


    // Check doubt

    if (doubt.trim() === "") {

        alert("Please type your doubt.");

        return;
    }


    const chatMessages =
        document.getElementById("chatMessages");


    // ================================
    // ADD STUDENT MESSAGE
    // ================================

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "user-message";


    userMessage.innerHTML = `

        <div class="message-name">
            👤 You
        </div>

        <div class="message-text">
            ${doubt}
        </div>

    `;


    chatMessages.appendChild(userMessage);


    // Clear input

    document.getElementById("doubt").value = "";


    // ================================
    // ADD THINKING MESSAGE
    // ================================

    const thinkingMessage =
        document.createElement("div");

    thinkingMessage.className =
        "ai-message";


    thinkingMessage.innerHTML = `

        <div class="message-name">
            🤖 AI Tutor
        </div>

        <div class="message-text">
            Thinking about your doubt...
        </div>

    `;


    chatMessages.appendChild(thinkingMessage);


    // Scroll to latest message

    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    // ================================
    // CREATE PROMPT
    // ================================

    const doubtPrompt = `

You are a friendly and patient AI tutor.

The student is currently studying:

Topic:
${topic}


Here is the original explanation given to the student:

${previousAnswer}


The student now asks:

${doubt}


Your task is to clarify the student's doubt.

Follow these rules:

1. Directly answer the student's question.
2. Use simple English.
3. Explain step by step.
4. Connect the answer to the previous explanation.
5. Give a simple example when useful.
6. Do not repeat the entire previous explanation.
7. Correct misunderstandings politely.
8. Assume the student is a beginner.
9. Keep the explanation focused.
10. End with a short question such as:
   "Does this make sense now?"

Do not mention that you are an AI model.

`;


    try {

        const response =
            await fetch("/ask-ai", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    prompt: doubtPrompt

                })

            });


        const data =
            await response.json();


        // ================================
        // UPDATE AI MESSAGE
        // ================================

        thinkingMessage.innerHTML = `

            <div class="message-name">
                🤖 AI Tutor
            </div>

            <div class="message-text">
                ${data.answer || data.error}
            </div>

        `;


    } catch (error) {

        thinkingMessage.innerHTML = `

            <div class="message-name">
                🤖 AI Tutor
            </div>

            <div class="message-text">
                Sorry, I couldn't connect to the AI.
            </div>

        `;

        console.error(error);

    }


    // Scroll to latest message

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}
function newStudySession() {

        saveCurrentSession();
    // Clear topic
    document.getElementById("topic").value = "";

    // Reset difficulty
    document.getElementById("difficulty").value = "Beginner";

    // Reset task
    document.getElementById("task").value = "explain";

    // Reset prompt style
    document.getElementById("promptStyle").value = "basic";


    // Clear code
    const code = document.getElementById("code");

    if (code) {
        code.value = "";
    }


    // Hide code section
    const codeSection =
        document.getElementById("codeSection");

    if (codeSection) {
        codeSection.style.display = "none";
    }


    // Clear prompt preview
    document.getElementById("promptPreview").textContent =
        "Your generated prompt will appear here.";


    // Clear AI answer
    document.getElementById("answer").textContent =
        "Your answer will appear here.";


    // Clear doubt
    document.getElementById("doubt").value = "";


    // Reset chat
    document.getElementById("chatMessages").innerHTML = `

        <div class="ai-message">

            <div class="message-name">
                🤖 AI Tutor
            </div>

            <div class="message-text">
                Hi! Start a new topic and generate
                an explanation. Then ask me anything
                you don't understand.
            </div>

        </div>

    `;


    // Reset prompt analysis
    document.getElementById("promptAnalysis").textContent =
        "Select a prompt style and generate an answer to see the analysis.";


    // Reset comparison
    document.getElementById("comparisonResult").textContent =
        'Click "Compare Prompts" to compare Basic, Structured, and Expert prompts.';


    // Scroll to topic
    document.getElementById("topic").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}
function saveCurrentSession() {

    const topic =
        document.getElementById("topic").value.trim();

    const difficulty =
        document.getElementById("difficulty").value;

    const task =
        document.getElementById("task").value;

    const answer =
        document.getElementById("answer").textContent;

    const chatMessages =
        document.getElementById("chatMessages");


    // Don't save an empty session

    if (topic === "") {

        return;

    }


    // Get existing history

    const history =
        JSON.parse(
            localStorage.getItem("studyHistory") || "[]"
        );


    // Create session

    const session = {

        topic: topic,

        difficulty: difficulty,

        task: getTaskName(task),

        date: new Date().toLocaleDateString(),

        answer: answer,

        chat: chatMessages
            ? chatMessages.innerHTML
            : ""

    };


    // Add newest session at the beginning

    history.unshift(session);


    // Keep only latest 10 sessions

    if (history.length > 10) {

        history.pop();

    }


    // Save to browser

    localStorage.setItem(
        "studyHistory",
        JSON.stringify(history)
    );


    // Refresh history display

    loadStudyHistory();

}
function getTaskName(task) {

    if (task === "explain") {
        return "Explain Topic";
    }

    if (task === "notes") {
        return "Generate Notes";
    }

    if (task === "quiz") {
        return "Generate Quiz";
    }

    if (task === "code") {
        return "Explain Code";
    }

    return task;
}
function loadStudyHistory() {

    const historyContainer =
        document.getElementById("studyHistory");

    const history =
        JSON.parse(
            localStorage.getItem("studyHistory") || "[]"
        );


    if (history.length === 0) {

        historyContainer.innerHTML = `
            <p class="empty-history">
                No study sessions yet.
            </p>
        `;

        return;
    }


    historyContainer.innerHTML = "";


    history.forEach(function(session, index) {

        const item =
            document.createElement("div");

        item.className = "history-item";


        item.innerHTML = `

            <h3>
                📖 ${session.topic}
            </h3>

            <div class="history-info">

                ${session.difficulty}
                •
                ${session.task}
                •
                ${session.date}

            </div>


         <div class="history-buttons">

    <button
        class="view-session-button"
        onclick="viewStudySession(${index})">

        👁️ View Session

    </button>


    <button
        class="delete-session-button"
        onclick="deleteStudySession(${index})">

        🗑️ Delete

    </button>

</div>   
        `;


        historyContainer.appendChild(item);

    });

}
function viewStudySession(index) {

    const history =
        JSON.parse(
            localStorage.getItem("studyHistory") || "[]"
        );


    const session = history[index];


    if (!session) {

        return;

    }


    // ==========================
    // RESTORE TOPIC
    // ==========================

    document.getElementById("topic").value =
        session.topic;


    // ==========================
    // RESTORE DIFFICULTY
    // ==========================

    document.getElementById("difficulty").value =
        session.difficulty;


    // ==========================
    // RESTORE TASK
    // ==========================

    const task =
        document.getElementById("task");


    if (task) {

        if (session.task === "Explain Topic") {

            task.value = "explain";

        }

        else if (session.task === "Generate Notes") {

            task.value = "notes";

        }

        else if (session.task === "Generate Quiz") {

            task.value = "quiz";

        }

        else if (session.task === "Explain Code") {

            task.value = "code";

        }

    }


    // ==========================
    // RESTORE AI ANSWER
    // ==========================

    const answer =
        document.getElementById("answer");


    if (answer) {

        answer.textContent =
            session.answer ||
            "No saved answer available.";

    }


    // ==========================
    // RESTORE CHAT
    // ==========================

    const chatMessages =
        document.getElementById("chatMessages");


    if (chatMessages) {

        if (session.chat) {

            chatMessages.innerHTML =
                session.chat;

        }

        else {

            chatMessages.innerHTML = `

                <div class="ai-message">

                    <div class="message-name">
                        🤖 AI Tutor
                    </div>

                    <div class="message-text">
                        This is an older study session.
                        No doubt conversation was saved.
                    </div>

                </div>

            `;

        }

    }


    // ==========================
    // SCROLL TO AI RESPONSE
    // ==========================

    document.getElementById("answer").scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}
function deleteStudySession(index) {

    const history =
        JSON.parse(
            localStorage.getItem("studyHistory") || "[]"
        );


    if (!history[index]) {

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this study session?"
        );


    if (!confirmDelete) {

        return;

    }


    history.splice(index, 1);


    localStorage.setItem(
        "studyHistory",
        JSON.stringify(history)
    );


    loadStudyHistory();

}
function startLearning() {

    const studySection = document.getElementById("studySection");

    if (studySection) {
        studySection.scrollIntoView({
            behavior: "smooth"
        });
    }
}
window.addEventListener("DOMContentLoaded", function() {

    loadStudyHistory();

});
