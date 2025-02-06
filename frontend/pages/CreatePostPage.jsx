import useComponentContext from "../hooks/ComponentContextHook";

function CreatePostPage() {

  const { isOn } = useComponentContext();

  return (
    <div
      className={`h-full w-[500%]  px-20 py-10 rounded-3xl dark:bg-black bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]  dark:border ${
        isOn.isNotificationOn || isOn.isSearchOn ? "-z-[3]" : "z-[999999]"
      }  dark:shadow-[#000]`}
    >

    </div>
  );
}

export default CreatePostPage;
