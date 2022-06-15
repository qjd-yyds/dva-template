import React from 'react';
import { Outlet, NavLink, useParams, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { getInvoices, deleteInvoice, getInvoice } from '../../data';

export default function Teams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();
  // console.log(searchParams.getAll('filter'));
  // console.log(location, 'location==>');
  const invoice = getInvoice(parseInt(params.id, 10));
  console.log(invoice, '----');
  const navigate = useNavigate();
  let invoices = getInvoices();
  return (
    <div>
      <h2>Teams</h2>
      <input
        type='text'
        onChange={event => {
          const filter = event.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
        value={searchParams.get('filter') || ''}
      />
      <button
        onClick={() => {
          console.log(location.search)
          deleteInvoice(invoice.number);
          navigate('/home');
        }}
      >
        navigate
      </button>
      {invoices.map(invoice => (
        <NavLink
          style={({ isActive }) => {
            return {
              display: 'block',
              margin: '1rem 0',
              color: isActive ? 'red' : ''
            };
          }}
          to={`/teams/${invoice.number}`}
          key={invoice.number}
        >
          {invoice.name}
        </NavLink>
      ))}
      <Outlet></Outlet>
    </div>
  );
}
