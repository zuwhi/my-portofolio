import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";
import { databases, config } from "../appwriteConfig";
import { ID } from "appwrite";

const Contact = () => {
  const [form, setForm] = useState({ name: "", telepon: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [messages, setMessages] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    try {
      const response = await databases.createDocument(config.databaseID, config.collectionID, ID.unique(), {
        name: form.name,
        telepon: form.telepon,
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
        setForm({ name: "", telepon: "", message: "" });
      }, 5000);
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

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${alert.type === "success" ? "text-grey-500" : "text-red-500"}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{alert.type === "success" ? "Success" : "Failed"}</p>
            <p className="py-4 text-lg font-regular">{alert.text}</p>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7 mt-14">
          <label className="text-black-500 font-semibold">
            Name
            <input type="text" name="name" className="input" placeholder="ex : Reihan" required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <label className="text-black-500 font-semibold">
            telepon
            <input type="number" name="telepon" className="input" placeholder="ex : 08123456789" required value={form.telepon} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea name="message" rows="4" className="textarea" placeholder="Write your thoughts here..." value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          </label>

          <button type="submit" disabled={loading} className="btn" onFocus={handleFocus} onBlur={handleBlur}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
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
