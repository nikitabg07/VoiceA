import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "import { useState } from "react";

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
/api/videos";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(API_URL);
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim() || !description.trim()) {
      alert("Please provide a title, description, and select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", file);

    try {
      await axios.post(`${API_URL}/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
      fetchVideos();
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert("Upload failed.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/delete-video/${id}`);
      alert("✅ Video deleted successfully!");
      fetchVideos();
    } catch (error) {
      console.error("❌ Delete failed:", error);
      alert("Delete failed.");
    }
  };
  const handlePlayForAll = (videoUrl: string) => {
    setPlayingVideo(videoUrl);
    // Simulate sending a notification to all students to play the video
    alert("📢 Video is now playing for all students!");
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-600 text-center mb-4">
        Upload and Manage Videos
      </h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-4 border p-4 rounded-lg bg-white shadow">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 w-full rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          Upload Video
        </button>
      </form>

      {/* Video List */}
      <h3 className="mt-4 text-xl font-bold">Your Videos</h3>
      {videos.length === 0 ? (
        <p className="text-center text-gray-600 mt-2">No videos available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((vid) => (
            <div key={vid._id} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold">{vid.title}</p>
              <p className="text-sm text-gray-600">{vid.description}</p>

              {/* Video Player */}
              <video controls className="w-full mt-2">
                <source src={vid.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => setPlayingVideo(vid.videoUrl)}
                  className="text-blue-600 hover:underline"
                >
                  Play
                </button>
                <button
                  onClick={() => handleDelete(vid._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Video Player */}
      {playingVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <video controls autoPlay className="w-3/4 max-w-2xl">
            <source src={playingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
