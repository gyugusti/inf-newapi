const IndexSensus = () => {
  return (
    <>
      <IndexSrp
        data={dataReg}
        currentPage={currentPage}
        perPage={perPage}
        total={total}
        totalPages={totalPages}
        searchTerm={cari}
      />
      <IndexReg />
    </>
  )
}

export default IndexSensus
