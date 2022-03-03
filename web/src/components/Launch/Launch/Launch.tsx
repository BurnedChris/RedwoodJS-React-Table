const Launch = ({ launch }) => {
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">{launch.id}</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{launch.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{launch.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Launch
