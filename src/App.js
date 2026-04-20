import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    date: "",
    title: "",
    content: "",
    mood: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      setEntries(entries.map(entry =>
        entry.id === editId ? { ...entry, ...form } : entry
      ));
      setEditId(null);
    } else {
      setEntries([
        ...entries,
        { id: Date.now(), ...form }
      ]);
    }

    setForm({
      date: "",
      title: "",
      content: "",
      mood: ""
    });
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEdit = (entry) => {
    setForm(entry);
    setEditId(entry.id);
  };

  return (
    <div className="container main-container">

      <h1 className="title mb-5">
        📓 Dijital Günlük
      </h1>

      <div className="row">

        {/* FORM */}
        <div className="col-md-4">
          <div className="glass-card p-4">

            <h5 className="mb-3">Yeni Günlük</h5>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Tarih</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Başlık</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Günlük</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Ruh Hali</label>
                <select
                  className="form-select"
                  name="mood"
                  value={form.mood}
                  onChange={handleChange}
                >
                  <option value="">Seç</option>
                  <option>😀 Mutlu</option>
                  <option>😐 Normal</option>
                  <option>😢 Üzgün</option>
                  <option>😡 Sinirli</option>
                </select>
              </div>

              <button className="btn btn-primary w-100">
                {editId ? "Güncelle" : "Günlük Ekle"}
              </button>

            </form>

          </div>
        </div>

        {/* LIST */}
        <div className="col-md-8">

          {entries.length === 0 && (
            <p className="text-center text-light">
              Henüz günlük eklenmedi.
            </p>
          )}

          <div className="row">

            {entries.map(entry => (

              <div className="col-md-6 mb-3" key={entry.id}>
                <div className="glass-card p-3 h-100">

                  <h5>{entry.title}</h5>

                  <h6 className="text-light">
                    {formatDate(entry.date)}
                  </h6>

                  <p className="card-text">
                    {entry.content}
                  </p>

                  <p>{entry.mood}</p>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(entry)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Sil
                  </button>

                </div>
              </div>

            ))}

          </div>

        </div>

      </div>

      <footer className="text-center text-light mt-5">
        <p>Dijital Günlük Uygulaması • React Project</p>
      </footer>

    </div>
  );
}

export default App;