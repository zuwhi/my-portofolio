import React, { useEffect, useState } from "react";
import { databases, config } from "../appwriteConfig";
import { Loader } from "@react-three/drei";
const Message = () => {
  // State Hooks di level atas
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  // Fungsi Fetch Data
  const fetchMessages = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await databases.listDocuments(config.databaseID, config.collectionID);
      setMessages(response.documents); // Simpan data yang diambil
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    fetchMessages();
  }, []); // Tanpa dependensi tambahan

  // Fungsi Delete Data
  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(config.databaseID, config.collectionID, id);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.$id !== id));
    } catch (error) {
      console.error("Failed to delete message:", error.message);
    }
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {messages.map((msg) => (
            <div key={msg.$id} className="relative bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              {/* Tombol Hapus di Pojok Kanan Atas */}
              <button className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleDelete(msg.$id)}>
                X
              </button>
              <span className="absolute bottom-1 right-2 text-gray-400 font-bold py-1 px-3 ">{new Date(msg.$createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>

              {/* Konten Card */}
              <h2 className="text-lg font-semibold mb-2">{msg.name}</h2>
              <p className="text-gray-500 mb-2">{msg.email}</p>
              <p className="text-gray-700">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Message;
