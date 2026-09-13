"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClient() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .single();

      if (!error) setClient(data);
      setLoading(false);
    }
    loadClient();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return <div style={{ padding: 40, color: "var(--sage)" }}>Chargement…</div>;
  }

  return (
    <div style={{ minHeight: "100vh", padding: 32, maxWidth: 480, margin: "0 auto" }}>
      <div style={{ color: "var(--sage)", fontSize: 12.5 }}>Bonjour,</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, marginBottom: 24 }}>
        {client?.full_name || "—"}
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 3,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <div style={{ color: "var(--sage)", fontSize: 12, marginBottom: 4 }}>E-mail</div>
        <div style={{ marginBottom: 12 }}>{client?.email}</div>
        <div style={{ color: "var(--sage)", fontSize: 12, marginBottom: 4 }}>Pays</div>
        <div>{client?.country}</div>
      </div>

      <div style={{ color: "var(--sage)", fontSize: 12.5, marginBottom: 24 }}>
        ✅ La connexion à Supabase fonctionne. Les écrans Offres, Formations et
        Réservation seront ajoutés à la prochaine étape.
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: "12px 20px",
          borderRadius: 3,
          background: "transparent",
          border: "1px solid var(--line)",
          color: "var(--ivory)",
          cursor: "pointer",
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
          }
