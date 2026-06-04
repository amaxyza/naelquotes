import { ALL_TAGS, tagLabel } from '../data/tags'

// Modal of tag checkboxes. Enabling a tag includes quotes carrying that tag in
// the practice pool. `enabled` is a Set of active tag strings.
export default function FilterModal({ enabled, onToggle, onSelectAll, onClearAll, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Filter</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {ALL_TAGS.length === 0 ? (
          <p className="filter-empty">No tags defined in the quote data yet.</p>
        ) : (
          <>
            <div className="filter-actions">
              <button className="link-btn" onClick={onSelectAll}>
                Select all
              </button>
              <button className="link-btn" onClick={onClearAll}>
                Clear all
              </button>
            </div>

            <ul className="filter-list">
              {ALL_TAGS.map((tag) => (
                <li key={tag}>
                  <label className="filter-item">
                    <input
                      type="checkbox"
                      checked={enabled.has(tag)}
                      onChange={() => onToggle(tag)}
                    />
                    {tagLabel(tag)}
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
