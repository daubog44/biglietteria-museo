import { getEsposizioniByYear } from "@/app/utils/ustilsDB";

export default async function InvoicesTable({ query }: { query: string }) {
  const res = await getEsposizioniByYear(query);
  if (!res) return;
  if (res.err) throw res.err;

  return (
    <div className="overflow-x-auto">
      <div className="divider"></div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>titolo</th>
            <th>tariffa</th>
            <th>data di inizio</th>
            <th>data di fine</th>
          </tr>
        </thead>
        <tbody>
          {res.results.map(
            (
              res: { titolo: any; tariffa: any; inizio: any; fine: any },
              idx: number
            ) => (
              <tr key={res.titolo + idx + "es"}>
                <th>{idx + 1}</th>
                <td>{res.titolo}</td>
                <td>{res.tariffa}&euro;</td>
                <td>{new Date(res.inizio).toLocaleDateString()}</td>
                <td>{new Date(res.fine).toLocaleDateString()}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
