import Link from "next/link";

export default async function Home() {
  //const res = await getAllOfBigliettiVisite();

  return (
    <main className="">
      <ul className="menu bg-base-200 w-56 rounded-box">
        <li>
          <Link href={"/acquisto"}>acquista biglietti</Link>
        </li>
        <li>
          <Link href={"/crea-esposizione"}>crea esposizione</Link>
        </li>
        <li>
          <Link href="/cerca-esposizione-per-anno">
            cerca esposizioni per anno
          </Link>
        </li>
        <li>
          <Link href="/biglietti-per-giorno">
            cerca biglietti per il giorno
          </Link>
        </li>
        <li>
          <Link href="/esposizioni-stat">statistiche esposizioni</Link>
        </li>
      </ul>
    </main>
  );
}
