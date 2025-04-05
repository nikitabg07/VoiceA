"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

export default function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("import { useState } from "react";

const TeacherUploadQuiz = () => {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: "" }]);
    const [isPublished, setIsPublished] = useState(false);

    const handleQuestionChange = (index: number, field: string, value: string) => {
        const updatedQuestions = [...questions];
        if (field === "question" || field === "answer") {
            updatedQuestions[index][field] = value;
        } else {
            updatedQuestions[index].options[parseInt(field)] = value;
        }
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
    };

    const uploadQuiz = async () => {
        const response = await fetch("https://voicea-back-ldg3.onrender.com/api/quiz/upload-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, questions }),
        });
        const data = await response.json();
        alert(data.message);
    };

    const publishQuizForStudents = async () => {
        alert("Publishing quiz... Please wait.");
        const response = await fetch("https://voicea-back-ldg3.onrender.com/api/quiz/publish-quiz", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });
        const data = await response.json();
        if (data.success) {
            setIsPublished(true);
            alert("Quiz published successfully for students!");
        } else {
            alert("Failed to publish quiz.");
        }
    };
    
    return (
        <div>
            <h2>Upload Quiz</h2>
            <input type="text" placeholder="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            {questions.map((q, index) => (
                <div key={index}>
                    <input type="text" placeholder="Question" value={q.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} />
                    {q.options.map((opt, i) => (
                        <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => handleQuestionChange(index, i.toString(), e.target.value)} />
                    ))}
                    <input type="text" placeholder="Correct Answer" value={q.answer} onChange={(e) => handleQuestionChange(index, "answer", e.target.value)} />
                </div>
            ))}
            <button onClick={addQuestion}>Add Question</button>
            <button onClick={uploadQuiz}>Upload Quiz</button>
            <button onClick={publishQuizForStudents} disabled={isPublished} style={{ backgroundColor: isPublished ? "gray" : "blue", color: "white" }}>
                {isPublished ? "Quiz Published" : "Publish for Students"}
            </button>
        </div>
    );
};

export default TeacherUploadQuiz;
/api/assignments/all")
      .then((res) => res.json())
      .then((data) => setAssignments(data.assignments))
      .catch((error) => console.error("❌ Error fetching assignments:", error));
  }, []);

  const downloadPDF = (text, studentEmail) => {
    const doc = new jsPDF();
    doc.text(`Student: ${studentEmail}\n\n${text}`, 10, 10);
    doc.save(`assignment-${studentEmail}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-4">📄 View Student Assignments</h1>

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {assignments.map((assignment, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">👤 {assignment.studentEmail}</h2>
              <p className="mt-2 text-gray-300">{assignment.text}</p>

              <button onClick={() => downloadPDF(assignment.text, assignment.studentEmail)} className="mt-2 px-4 py-2 bg-yellow-500 text-black rounded-lg">
                📥 Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
