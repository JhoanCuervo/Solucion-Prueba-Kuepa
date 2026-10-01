import { app } from "@/atoms/kuepa"
import { FormEvent, useEffect, useState } from "react"
import { IData, IPrograms, LeadsProps } from "./interfaceLeads";
import { initData } from "./initialData";
import { programService } from "@/services/programService";
import { leadService } from "@/services/leadService";
import { toast } from "@/components/hooks/use-toast";



export default function Leads(props?: LeadsProps) {
  const [form, setForm] = useState<IData>(initData);
  const [loading, setLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<IPrograms[]>([]);
  useEffect(() => {
    app.set({
      ...(app.get() || {}),
      app: 'kuepa',
      module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb: [
        {
          title: 'Leads',
          url: '/leads'
        }
      ]
    })

    const loadPrograms = async () => {
      const programsList = await programService.list();
      setPrograms(programsList.list);
    }
    loadPrograms();
  }, [])
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    console.log(form);

    const res = await leadService.upsert({ ...form });
    console.log(res);
    if (res.code === 200) {
      toast({ title: "Prospecto registrado", description: "El prospecto se guardó correctamente." });
      setForm(initData);
    } else {
      toast({ variant: "destructive", title: "Error", description: "Error al registrar el prospecto" });
    }
    setLoading(false)
  }
  return (
    <>
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Registrar prospecto</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nombres</label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Nicolas"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Apellidos</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Cuervo"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="nicolas@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Celular</label>
            <input
              name="mobile_phone"
              value={form.mobile_phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="3126606400"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Programa de interés</label>
            <select
              name="interestProgram"
              value={form.interestProgram}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option key="0" value="">-- Seleccione --</option>
              {programs.length > 0 && programs.map(({ _id: id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded px-3 py-2 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "guardar prospecto"}
          </button>
        </form>
      </div>
    </>
  )
}