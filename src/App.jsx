import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [data, setData] = useState([]); 
  const [nom, setNom] = useState(); 
  const [model, setModel] = useState(); 
  const [yil, setYil] = useState(); 
  const [narx, setNarx] = useState(); 
  const [form, setForm] = useState(false);
  const [updateId, setUpdateId] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/mashinalar')
        setData(res)
      } catch(err) {
        console.log(err)
      }
    }
    getData()
  }, [])



  
  // create
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/mashinalar", { nom, narx, model, yil }).then((res) => {
      console.log(res)
      toast.success('Successfully added!')
    }).catch((err) => {
      console.log(err)
    })
  };
  
  // edit 
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/mashinalar/${updateId}`, { nom, narx, model, yil }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  };

  // delete
  function handleDelete(id) {
    axios.delete(`http://localhost:3000/mashinalar/${id}`).then(() => {
      setData(data.filter((book) => book.id !== id));
      toast.error("Successfuly deleted")
    });
  }

  // Update
  const handleUpdate = (id) => {
    setUpdateId(id)
    setForm(true)
    axios.get(`http://localhost:3000/mashinalar/${id}`).then((res) => {
      setNom(res.data.nom)
      setNarx(res.data.narx)
      setModel(res.data.model)
      setYil(res.data.yil)
    });
  };
  
  // close 
  const handleClose = () => {
    setForm(false)
    setNom("")
    setNarx("")
    setModel("")
    setYil("")
  };
  

  return (
    <div>
      <div><Toaster/></div>
      <h1 className="text-center py-[20px] text-[30px]">JSON-server CRUD</h1>
      <div  className="max-w-[1200px] px-[30px] mx-auto flex gap-[20px]">
        <div className="w-[30%]">
          {!form && (
            <form onSubmit={handleSubmit} className=" bg-[#e5e5e5] p-[20px] rounded-[10px]">
            <h2 className="text-center text-[20px] font-[500]">Create</h2>
            <label>
              <span>Name</span>
              <input value={nom} onChange={(e) => setNom(e.target.value)} type="text" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <label>
              <span>Cost</span>
              <input value={narx} onChange={(e) => setNarx(e.target.value)} type="number" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <label>
              <span>Model</span>
              <input value={model} onChange={(e) => setModel(e.target.value)} type="text" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <label>
              <span>Year</span>
              <input value={yil} onChange={(e) => setYil(e.target.value)} type="number" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <button type="submit" className="w-full bg-[blue] text-[#fff] p-[6px] rounded-[5px]">Submit</button>
          </form>
          )}
          {form && (
            <form onSubmit={handleEditSubmit} className=" bg-[#e5e5e5] p-[20px] rounded-[10px]">
            <div  className="flex justify-between">
              <div></div>
              <h2 className="text-center text-[20px] font-[500]">Edit</h2>
              <h1 onClick={handleClose} className="rotate-[45deg] text-[30px] translate-y-[-10px] cursor-pointer">
                +
              </h1>
            </div>
            <label>
              <span>Name</span>
              <input value={nom} onChange={(e) => setNom(e.target.value)} type="text" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <label>
              <span>Cost</span>
              <input value={narx} onChange={(e) => setNarx(e.target.value)} type="number" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <label>
              <span>Model</span>
              <input value={model} onChange={(e) => setModel(e.target.value)} type="text" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <label>
              <span>Year</span>
              <input value={yil} onChange={(e) => setYil(e.target.value)} type="number" className="w-[100%] mb-[10px] border-[1px] px-[10px]"/>
            </label>
            <button type="submit" className="w-full bg-[blue] text-[#fff] p-[6px] rounded-[5px]">Submit</button>
          </form>
          )}
        </div>
        <div className="w-[70%] bg-[#e5e5e5] p-[20px] rounded-[10px]">
          {data.data?.map((item) => (
            <div key={item.id} className="w-full flex  border-[1px] mb-[5px]">
              <div className="w-[10px] bg-[#a1a1a1] border-r-[1px] px-[10px] flex justify-center">
                {item.id[0]}
              </div>
              <div className="w-[30%] border-r-[1px] px-[10px] flex justify-center">
                {item.nom}
              </div>
              <div className="w-[30%] border-r-[1px] px-[10px] flex justify-center">
                {item.model}
              </div>
              <div className="w-[30%] border-r-[1px] px-[10px] flex justify-center">
                {item.yil}
              </div>
              <div className="w-[30%] border-r-[1px] px-[10px] flex justify-center">
                {item.narx}$
              </div>
              <div onClick={() => handleDelete(item.id)} className="w-[10px] px-[10px] cursor-pointer bg-[red] flex justify-center">
                <p className="rotate-[45deg] ">+</p>
              </div>
              <div onClick={() => handleUpdate(item.id)} className=" px-[10px] cursor-pointer bg-[coral] border-l-[1px] flex justify-center">
                update
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App