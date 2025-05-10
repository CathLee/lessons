/*
 * @Date: 2025-05-09 21:35:02
 * @Description: 
 */
import A from '../img/aa.jpg'
import B from '../img/download.jpg'
import C from '../img/asuka.jpg'
console.log("Image paths:", { A, B, C });
const Preload = () => {
  return <div>Preload

    <img src={A} alt="A" />
    <img src={B} alt="B" />
    <img src={C} alt="C" />
  </div>;
};
export default Preload;