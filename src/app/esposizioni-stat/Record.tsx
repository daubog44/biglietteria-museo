import { getRicavatoDiEsposizioneById } from "../utils/ustilsDB";

function percentage(partialValue: number, totalValue: number) {
  return (totalValue * partialValue) / 100;
}

export default async function RecordComponent({
  idEs,
  idx,
  titoloEsposizione,
  categorie,
  tariffa,
}: {
  idEs: number;
  idx: number;
  titoloEsposizione: string;
  categorie: any[];
  tariffa: number;
}) {
  const { err, results } = await getRicavatoDiEsposizioneById(idEs);
  if (err) throw err;
  const bigliettiVenduti = (results as any[]).length;
  let ricavatoTot = 0;
  for (let riv of results) {
    const sconto = percentage(riv.sconto, riv.tariffa) ?? 0;
    ricavatoTot += riv.tariffa - sconto;
  }

  return (
    <>
      <tr key={idx + "dfs"}>
        <th>{idx}</th>
        <td>{titoloEsposizione}</td>
        <td>{tariffa}&euro;</td>
        <td>{ricavatoTot.toFixed(2)}&euro;</td>
        <td>{results.length}</td>
        {categorie.map((cat) => (
          <td>
            {results.filter(
              (res: { descrizione: any }) => res.descrizione === cat.descrizione
            ).length ?? 0}
          </td>
        ))}
      </tr>
    </>
  );
}
