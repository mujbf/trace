import type { Metadata } from 'next/types'
import React from 'react'

import { ChevronRight } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlocksPage() {
  return (
    <div className="flex flex-col gap-16">
      <div className="container flex flex-col gap-8 p-8 bg-[#FAFAFA] rounded-4xl shadow-md">
        {/* Colors */}
        <h1 className="manrope-semibold text-4xl text-primary-700">※ Colors</h1>

        {/* Primary Colors */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Primary <span className="manrope-light">- Purple</span>
          </h2>
          <div className="grid grid-cols-10 gap-2">
            <div className="w-16 h-16 bg-[#f4f4fe] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">50</span>
            </div>
            <div className="w-16 h-16 bg-[#edeafd] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">100</span>
            </div>
            <div className="w-16 h-16 bg-[#dbd8fc] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">200</span>
            </div>
            <div className="w-16 h-16 bg-[#c1b9f9] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">300</span>
            </div>
            <div className="w-16 h-16 bg-[#a391f4] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">400</span>
            </div>
            <div className="w-16 h-16 bg-[#8465ed] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white font-medium">500</span>
            </div>
            <div className="w-16 h-16 bg-[#7344e3] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">600</span>
            </div>
            <div className="w-16 h-16 bg-[#6433cf] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">700</span>
            </div>
            <div className="w-16 h-16 bg-[#532aad] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">800</span>
            </div>
            <div className="w-16 h-16 bg-[#45248e] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">900</span>
            </div>
          </div>
        </div>

        {/* Secondary Colors */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Secondary <span className="manrope-light">- Blue</span>
          </h2>
          <div className="grid grid-cols-10 gap-2">
            <div className="w-16 h-16 bg-[#e9f4ff] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">50</span>
            </div>
            <div className="w-16 h-16 bg-[#d8e9ff] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">100</span>
            </div>
            <div className="w-16 h-16 bg-[#b8d6ff] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">200</span>
            </div>
            <div className="w-16 h-16 bg-[#8eb9ff] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">300</span>
            </div>
            <div className="w-16 h-16 bg-[#618eff] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">400</span>
            </div>
            <div className="w-16 h-16 bg-[#3d64ff] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white font-medium">500</span>
            </div>
            <div className="w-16 h-16 bg-[#1c36ff] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">600</span>
            </div>
            <div className="w-16 h-16 bg-[#1128f1] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">700</span>
            </div>
            <div className="w-16 h-16 bg-[#1125bc] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">800</span>
            </div>
            <div className="w-16 h-16 bg-[#182a97] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">900</span>
            </div>
          </div>
        </div>

        {/* Tertiary Colors */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Tertiary <span className="manrope-light">- Green</span>
          </h2>
          <div className="grid grid-cols-10 gap-2">
            <div className="w-16 h-16 bg-[#f0fbea] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">50</span>
            </div>
            <div className="w-16 h-16 bg-[#ddf5d2] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">100</span>
            </div>
            <div className="w-16 h-16 bg-[#bceda9] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">200</span>
            </div>
            <div className="w-16 h-16 bg-[#92df77] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">300</span>
            </div>
            <div className="w-16 h-16 bg-[#6dce4d] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">400</span>
            </div>
            <div className="w-16 h-16 bg-[#49a92c] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white font-medium">500</span>
            </div>
            <div className="w-16 h-16 bg-[#388f21] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">600</span>
            </div>
            <div className="w-16 h-16 bg-[#2e6d1e] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">700</span>
            </div>
            <div className="w-16 h-16 bg-[#28571d] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">800</span>
            </div>
            <div className="w-16 h-16 bg-[#244a1d] rounded-lg shadow-sm border border-gray-200 flex items-end justify-center pb-1">
              <span className="text-xs text-white">900</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-8 p-8 bg-[#FAFAFA] rounded-4xl shadow-md">
        {/* Text Components */}
        <h1 className="manrope-semibold text-4xl text-primary-700">※ Text Components</h1>

        <h2 className="manrope-medium text-2xl underline">Title</h2>
        {/* Copy This */}
        <h1 className="space-grotesk-light text-3xl md:text-5xl lg:text-6xl leading-[120%] tracking-tighter">
          Technologically Re-Awakening Culture of Excellence
        </h1>
        <hr />

        <h2 className="manrope-medium text-2xl underline">Heading</h2>
        {/* Copy This */}
        <h2 className="space-grotesk-light text-6xl leading-[120%] tracking-tighter">
          Transforming Tech Innovation in Lanka
        </h2>
        <hr />

        <h2 className="manrope-medium text-2xl underline">Sub Heading</h2>
        {/* Copy This */}
        <h3 className="manrope-semibold text-2xl leading-[150%]">Accelerators & Incubators</h3>
        <hr />

        <h2 className="manrope-medium text-2xl underline">Sub Heading 2</h2>
        {/* Copy This */}
        <h3 className="manrope-semibold text-xl leading-[150%]">Power and Energy Solutions</h3>
        <hr />

        <h2 className="manrope-medium text-2xl underline">Body</h2>
        {/* Copy This */}
        <p className="manrope-light text-lg leading-[150%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <hr />

        <h2 className="manrope-medium text-2xl underline">Nav Item</h2>
        {/* Copy This */}
        <p className="manrope-light text-base leading-[150%]">About</p>
      </div>

      <div className="container flex flex-col gap-8 p-8 bg-[#FAFAFA] rounded-4xl shadow-md">
        {/* Buttons */}
        <h1 className="manrope-semibold text-4xl text-primary-700">※ Buttons</h1>

        <h2 className="manrope-medium text-2xl underline">Primary Button</h2>
        {/* Copy This */}
        <button className="group relative w-fit px-5 py-4 rounded-full manrope-medium text-base text-dark-100 bg-white border border-dark-20 overflow-hidden transition-all duration-300 ease-out hover:text-light-100 hover:bg-primary-700 hover:border-primary-800 hover:scale-105 hover:shadow-lg hover:shadow-primary-700/25">
          <span className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
            Contact Us
          </span>

          {/* Fluid background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>

          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-primary-700 opacity-0 group-hover:opacity-20 transform scale-75 group-hover:scale-100 transition-all duration-700 ease-out"></div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </button>

        <h2 className="manrope-medium text-2xl underline">Secondary Button</h2>
        {/* Copy This */}
        <button className="group relative w-fit flex items-center gap-2 manrope-medium text-base text-dark-80 transition-all duration-300 ease-out hover:text-primary-800 hover:gap-3">
          <span className="relative overflow-hidden">
            Learn More
            {/* Animated underline */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
          </span>

          {/* Arrow with smooth movement */}
          <div className="relative overflow-hidden">
            <ChevronRight className="w-4 h-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />

            {/* Arrow trail effect */}
            <ChevronRight
              className="w-4 h-4 absolute top-0 left-0 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60 transition-all duration-300 ease-out delay-75"
              strokeWidth={1}
            />
          </div>
        </button>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Sample Blocks Page',
    description:
      'A sample page showcasing various component blocks including text, buttons, cards, and more.',
  }
}
