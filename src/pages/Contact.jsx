import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";
import { databases, config } from "../appwriteConfig";
import { ID } from "appwrite";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [messages, setMessages] = useState([]);

  // Mengambil data dari Appwrite
  // const fetchMessages = async () => {
  //   try {
  //     const response = await databases.listDocuments(config.databaseID, config.collectionID);
  //     setMessages(response.documents);
  //   } catch (error) {
  //     console.error("Failed to fetch messages:", error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchMessages();
  // }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    try {
      const response = await databases.createDocument(config.databaseID, config.collectionID, ID.unique(), {
        name: form.name,
        email: form.email,
        message: form.message,
      });

      setMessages([...messages, response]);

      showAlert({
        show: true,
        text: "Thank you for your message 😃",
        type: "success",
      });

      setTimeout(() => {
        hideAlert(false);
        setCurrentAnimation("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error(error);
      showAlert({
        show: true,
        text: "Failed to send message 😢",
        type: "danger",
      });
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(config.databaseID, config.collectionID, id);
      setMessages(messages.filter((msg) => msg.$id !== id));
    } catch (error) {
      console.error("Failed to delete message:", error.message);
    }
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7 mt-14">
          <label className="text-black-500 font-semibold">
            Name
            <input type="text" name="name" className="input" placeholder="John" required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input type="email" name="email" className="input" placeholder="John@gmail.com" required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea name="message" rows="4" className="textarea" placeholder="Write your thoughts here..." value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          </label>

          <button type="submit" disabled={loading} className="btn" onFocus={handleFocus} onBlur={handleBlur}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>

        {/* <ul className="mt-10">
          {messages.map((msg) => (
            <li key={msg.$id} className="flex justify-between items-center">
              {msg.message}
              <button className="btn-danger" onClick={() => handleDelete(msg.$id)}>
                Delete
              </button>
            </li>
          ))}
        </ul> */}
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

          <Suspense fallback={<Loader />}>
            <Fox currentAnimation={currentAnimation} position={[0.5, 0.35, 0]} rotation={[12.629, -0.6, 0]} scale={[0.5, 0.5, 0.5]} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;