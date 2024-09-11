import React from 'react'

const TitleBar = ({ title, toggle }) => {

    const handleToggle = () => {
        toggle(true);
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem' }}>
                <h1>{title && title}</h1>
                <button
                    style={{
                        padding: '12px 25px', fontWeight: '700', fontSize: '16px',
                        background: "#7cFC00", borderRadius: '5px', color: '#111',
                        display:'flex',alignItems:'center',gap:'5px',cursor:'pointer'
                    }}
                    onClick={handleToggle}
                >
                    <i className="bi bi-plus"></i>Add New
                </button>
            </div>
        </div>
    )
}

export default TitleBar