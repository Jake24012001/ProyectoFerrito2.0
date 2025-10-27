// src/services/auditoriaService.ts
import { auditoriaproducto as AuditoriaProducto } from "../interfaces/auditoriaproductos";

export async function getAuditorias(limit = 100): Promise<AuditoriaProducto[]> {
  const res = await fetch(`/api/auditorias?limit=${limit}`);
  if (!res.ok) throw new Error("Error al obtener auditorías");
  return await res.json();
}

export async function createAuditoria(
  data: Omit<AuditoriaProducto, "id_auditoria">
): Promise<AuditoriaProducto> {
  const res = await fetch("/api/auditorias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al registrar auditoría");
  return await res.json();
}

export async function updateAuditoria(
  id: number,
  data: Partial<AuditoriaProducto>
): Promise<AuditoriaProducto> {
  const res = await fetch(`/api/auditorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar auditoría");
  return await res.json();
}

export async function deleteAuditoria(id: number): Promise<void> {
  const res = await fetch(`/api/auditorias/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar auditoría");
}
