import { SubmitButton } from "../components/submit-button";
import {
  connection,
  getAllCategories,
  getAllEsposizioni,
} from "../utils/ustilsDB";
export const dynamic = "force-dynamic";

export default async function AcquistaBigliettiPage() {
  const { err, results } = await getAllCategories();
  if (err) throw err;
  const res = await getAllEsposizioni();
  if (res.err) throw err;

  async function creaBiglietto(formData: FormData) {
    "use server";

    const categoia = formData.get("cate");
    const esposizione = formData.get("esposizione");
    let date = formData.get("date");
    if (!categoia || !esposizione || !date)
      throw new Error("valori non inseriti");
    const is_base = esposizione === "NULL" ? 1 : 0;
    const dateIso = new Date(date.toString()).toJSON().slice(0, 10);

    if (is_base) {
      const addedBiglietto = await connection.execute(
        `INSERT INTO biglietto (giorno_acquisto, is_base, categoria) VALUES ("${dateIso}", ${is_base}, ${Number(
          categoia?.toString().split(")")[0]
        )})`
      );
      // @ts-ignore
      const id = addedBiglietto[0].insertId;
      await connection.execute(
        `INSERT INTO visita (titolo, biglietto) VALUES ("visita-${id}", ${id})`
      );
    } else {
      await connection.query(
        `INSERT INTO biglietto (giorno_acquisto, is_base, categoria, esposizione) VALUES ("${dateIso}", ${is_base}, ${Number(
          categoia?.toString().split(")")[0]
        )}, ${Number(esposizione?.toString().split(")")[0])})`
      );
    }

    return { success: "true" };
  }

  return (
    <form action={creaBiglietto} className="">
      <select
        defaultValue="6)"
        required
        className="select select-bordered w-full"
        name="cate"
      >
        <option disabled>seleziona categoria</option>
        {results.map((res: { descrizione: string; id: number }) => (
          <option key={res.id}>
            {res.id}) {res.descrizione}
          </option>
        ))}
      </select>
      <div className="divider"></div>
      <select
        defaultValue="NULL"
        required
        className="select select-bordered w-full max-w-xs"
        name="esposizione"
      >
        <option disabled>seleziona o no l'esposizione</option>
        <option>NULL</option>
        {res.results.map((res: { titolo: string; codice: number }) => (
          <option key={res.codice + "es"}>
            {res.codice}) {res.titolo}
          </option>
        ))}
      </select>
      <div className="divider"></div>
      <input
        type="text"
        name="date"
        placeholder="YYY-MMM-DDD"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="divider"></div>

      <SubmitButton />
    </form>
  );
}
