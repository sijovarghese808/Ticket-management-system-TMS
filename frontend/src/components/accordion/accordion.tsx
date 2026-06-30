import React from 'react'

const Accordion = () => {
  return (
    <div className="m-2 space-y-2">
    <div
      className="group flex flex-col gap-2 rounded-lg bg-black p-5 text-white"
      tabIndex={1}
    >
      <div className="flex cursor-pointer items-center justify-between">
        <span> HTML </span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
          className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
        />
      </div>
      <div
        className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
    </div>
  
    <div
      className="group flex flex-col gap-2 rounded-lg bg-black p-5 text-white"
      tabIndex={2}
    >
      <div className="flex cursor-pointer items-center justify-between">
        <span> CSS </span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
          className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
        />
      </div>
      <div
        className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
    </div>
  
    <div
      className="group flex flex-col gap-2 rounded-lg bg-black p-5 text-white"
      tabIndex={3}
    >
      <div className="flex cursor-pointer items-center justify-between">
        <span> JAVASCRIPT </span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
          className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
        />
      </div>
      <div
        className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
    </div>
  </div>
  )
}

export default Accordion