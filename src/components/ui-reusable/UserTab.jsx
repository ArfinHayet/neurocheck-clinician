import Header from "./Header";

const UserTab = ({ tabs, selected, setSelected, title, description }) => {
    return (
      <div>
        <Header
        title={title}
        description={description}
        />    
             
      <div className="flex flex-row justify-center  items-center gap-20  ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className={`pb-2 text-xs font-medium transition-colors duration-200 ${
              selected === tab
                ? "text-[#0A6876] cursor-pointer border-b-2 border-[#0A6876]"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
            
      </div></div> 
 
    );
};

export default UserTab;

