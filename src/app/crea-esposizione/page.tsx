import { connection } from "../utils/ustilsDB";
import { SubmitButton } from "../components/submit-button";
export const dynamic = "force-dynamic";

export default async function CreaEsposizionePage() {
  async function creaBiglietto(formData: FormData) {
    "use server";

    const sDate = formData.get("start-date");
    const eDate = formData.get("end-date");
    const tariffa = formData.get("tariffa");
    const titolo = formData.get("titolo");

    if (!sDate || !eDate || !tariffa || !titolo)
      throw new Error("valori non inseriti");
    const startDate = new Date(sDate.toString()).toJSON().slice(0, 10);
    const endtDate = new Date(eDate.toString()).toJSON().slice(0, 10);

    connection.execute(
      `INSERT INTO esposizione (titolo, tariffa, inizio, fine) VALUES ("${titolo}", ${Number(
        tariffa
      )}, "${startDate}", "${endtDate}")`
    );

    return { success: true };
  }

  return (
    <form action={creaBiglietto} className="">
      <input
        type="text"
        placeholder="titolo esposzione"
        className="input input-bordered w-full max-w-xs"
        name="titolo"
      />
      <div className="divider"></div>

      <input
        type="text"
        placeholder="tariffa"
        className="input input-bordered w-full max-w-xs"
        name="tariffa"
      />
      <div className="divider"></div>

      <input
        type="text"
        name="start-date"
        placeholder="start YYY-MMM-DDD"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="divider"></div>

      <input
        type="text"
        name="end-date"
        placeholder="end YYY-MMM-DDD"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="divider"></div>

      <SubmitButton />
    </form>
  );
}
