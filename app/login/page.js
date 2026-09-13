"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const inputStyle = {
  width: "100%",
  padding: "12px 13px",
  borderRadius: 3,
  border: "1px solid var(--line)",
  background: "var(--surface)",
  color: "var(--ivory)",
  fontSize: 13.5,
  outline: "none",
  marginBottom: 14,
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Sénégal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const authUserId = data.user?.id;
      if (authUserId) {
        const { error: insertError } = await supabase.from("clients").insert({
          auth_user_id: authUserId,
          full_name: fullName,
          email,
          country,
          language: "fr",
        });
        if (insertError) {
          setError(insertError.message);
          setLoading(false);
          return;
        }
      }

      router.push("/home");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }
      router.push("/home");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 360 }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26,
            marginBottom: 20,
          }}
        >
          {mode === "login" ? "Bon retour" : "Créer un compte"}
        </div>

        {mode === "signup" && (
          <input
            style={inputStyle}
            placeholder="Nom complet"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <input
          style={inputStyle}
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {mode === "signup" && (
          <select
            style={inputStyle}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Sénégal</option>
            <option>France</option>
            <option>États-Unis</option>
            <option>Canada</option>
            <option>Autre</option>
          </select>
        )}

        {error && (
          <div style={{ color: "#e08080", fontSize: 12.5, marginBottom: 14 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: 3,
            background: "var(--ember)",
            color: "var(--ivory)",
            border: "none",
            fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 14,
          }}
        >
          {loading ? "..." : mode === "login" ? "Se connecter" : "Créer un compte"}
        </button>

        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            style={{
              background: "none",
              border: "none",
              color: "var(--sand)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "Créer un compte" : "Se connecter"}
          </button>
        </div>
      </form>
    </div>
  );
            }
