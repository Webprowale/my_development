import Image from "next/image";

type Props = { form };

function FormFill({ form }: Props) {
  const formFields = form.fields.map((input, index) => (
    <div key={index} className="mb-4 p-0 w-full">
      <label
        htmlFor={input.parameter}
        className="block text-gray-700 font-bold"
      >
        {input.label}
      </label>
      <input
        type={input.type}
        id={input.name}
        name={input.name}
        placeholder={input.placeholder}
        className={`w-full my-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${input.expose ? "required" : ""}`}
      />
    </div>
  ));

  return (
    <div className="bg-[#F7F9FC] py-3">
      <div className=" flex items-start flex-col gap-[3px] justify-start px-5">
        <div className="flex items-start gap-[12px] justify-start">
          <Image
            src="/assets/gopaddi/chat-icon.png"
            alt="icon"
            width={25}
            height={25}
          />

          <div className="flex flex-col">
            <div>
              <p className="text-[1rem]  text-gray-500 mb-2">{form.title}</p>
              <small className="text-[0.5rem] text-gray-400 mb-2">
                {form.subtitle}
              </small>

              {formFields}

              {/* <div className="mb-4 p-0 w-full">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-bold"
                >
                  First Name
                </label>
                <input
                  type={form.subtitle}
                  id="firstName"
                  name="firstName"
                  className="w-full my-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

              {/* <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="block w-full my-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-700 font-bold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="block w-full my-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

              <div className="my-2 flex space-x-4">
                <button
                  type="reset"
                  className=" bg-[#E7F0FF] text-blue-500 shadow py-2 px-4 rounded-md hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600  focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormFill;
