export default function SchemasPage() {
  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Template Bridge</p>
        <h1>Import Schemas</h1>
        <p>Reference formats for local CSV and JSON imports.</p>
      </div>

      <article className="brutal-card">
        <h2>Vendor Directory JSON</h2>
        <pre>{`name,category,tier,terms,reportsTo,startupFriendly,verificationStatus
Example Vendor,Office Supplies,1,Net 30,D&B,true,needs_review`}</pre>
      </article>

      <article className="brutal-card">
        <h2>Tradeline Planner CSV</h2>
        <pre>{`id,vendorName,accountType,tier,status,limitAmount,balanceAmount,reportsTo,notes
tl-123,Uline,Vendor account,1,planned,0,0,D&B,Review terms directly`}</pre>
      </article>

      <article className="brutal-card">
        <h2>Dashboard JSON</h2>
        <pre>{`bizcredit.v1.profile
bizcredit.v1.passport
bizcredit.v1.tradelines
bizcredit.v1.importJobs`}</pre>
      </article>
    </section>
  );
}
