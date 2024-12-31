import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <nav className="bg-dark-background text-white flex justify-between items-center h-14 md:h-20 px-10 md:px-20">
      <Link to="/" className="text-primary text-xl font-bold">CertChain</Link>
      <ul className="gap-10 list-none hidden md:flex">
        <li><Link to="/validate" className="hover:opacity-90 hover:text-primary transition">Validar</Link></li>
        <li><Link to="/issue" className="hover:opacity-90 hover:text-primary transition">Emitir</Link></li>
        {/* TODO: Modificar para exibir opção apenas para owner */}
        <li><Link to="/registerInstitution" className="bg-primary font-semibold text-dark-background px-3 py-2 rounded-full hover:opacity-90 transition">Registrar Instituição</Link></li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <div className={nav ? 'fixed left-0 top-0 p-4 w-[70%] h-full bg-dark-background ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <Link to="/" className="text-primary text-xl font-bold m-4">CertChain</Link>
        <ul className="p-4 flex flex-col gap-6 list-none">
          <li><Link to="/validate" className="hover:opacity-90 hover:text-primary transition">Validar</Link></li>
          <li><Link to="/issue" className="hover:opacity-90 hover:text-primary transition">Emitir</Link></li>
          <li><Link to="/registerInstitution" className="bg-primary font-semibold text-dark-background px-3 py-2 rounded-full hover:opacity-90 transition flex flex-nowrap text-center">Registrar Instituição</Link></li>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;


// const Navbar = () => {
//   return (
//     <nav className='flex justify-between items-center text-white py-6 px-12 bg-dark-background'>
//       <div className='flex justify-start gap-12 list-none'>
//         <li>
//           <Link to="/" className='text-primary text-xl font-bold'>CertChain</Link>
//         </li>
//         <li>
//           <Link to="/validate">Validar</Link>
//         </li>
//         <li>
//           <Link to="/issue">Emitir</Link>
//         </li>
//       </div>
//       <div className='flex justify-start gap-12 list-none'>
//         <li>
//           <Link to="" className='text-primary font-semibold'>Login</Link>
//         </li>
//         <li>
//           <Link to="" className='bg-primary font-semibold text-dark-background px-3 py-2 rounded-full hover:opacity-90 transition'>Registrar Instituição</Link>
//         </li>
//       </div>
//     </nav>
//   )
// }
// export default Navbar


