import './VariablePanel.css'

export default function VariablePanel({ variables }) {
  const entries = Object.entries(variables)
  if (entries.length === 0) return null

  return (
    <div className="variable-panel">
      <h4 className="variable-panel-title">Variables</h4>
      <table className="variable-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([name, value]) => (
            <tr key={name}>
              <td className="variable-name">{name}</td>
              <td className="variable-value">
                {typeof value === 'boolean' ? (value ? 'vrai' : 'faux') : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
