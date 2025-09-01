'use client'

import React from 'react'
import { Mail, Linkedin } from 'lucide-react'
import type { TeamBlock as TeamBlockType } from '@/payload-types'
import { Title, SubHeading, SubHeading2, Body } from '@/components/Text/typography'
import { PrimaryButton, SecondaryButton } from '@/components/Button/button'

export const TeamBlockComponent: React.FC<TeamBlockType> = ({ title, teamSections }) => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-24 tertiary-gradient">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        {/* Main Title */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <Title className="text-center sm:text-left">{title}</Title>
        </div>

        {/* Team Sections */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {teamSections &&
            teamSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
                {/* Section Title */}
                <div className="w-full md:w-1/5 mb-8 md:mb-0 border-l-2 border-primary-600 pl-4 h-fit">
                  <SubHeading2 className="text-lg sm:text-xl lg:text-2xl">
                    {section.sectionTitle}
                  </SubHeading2>
                </div>

                {/* Team Members Grid */}
                <div className="w-full md:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {section.members &&
                    section.members.map((member, memberIndex) => {
                      const photoUrl =
                        member.photo &&
                        typeof member.photo === 'object' &&
                        'url' in member.photo &&
                        member.photo.url
                          ? member.photo.url
                          : ''
                      const photoAlt =
                        member.photo &&
                        typeof member.photo === 'object' &&
                        'alt' in member.photo &&
                        member.photo.alt
                          ? member.photo.alt
                          : member.name || 'Team member'

                      return (
                        <div
                          key={memberIndex}
                          className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          {/* Member Photo */}
                          <div className="aspect-square overflow-hidden bg-gray-100">
                            {photoUrl ? (
                              <img
                                src={photoUrl}
                                alt={photoAlt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400">
                                  {member.name
                                    ?.split(' ')
                                    .map((n) => n.charAt(0))
                                    .join('')
                                    .slice(0, 2)}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Member Info */}
                          <div className="p-3 sm:p-4">
                            <SubHeading2 className="mb-1">{member.name}</SubHeading2>
                            {member.position && (
                              <Body className="text-dark-60 ">{member.position}</Body>
                            )}
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                            <div className="text-center text-dark-80 w-full">
                              <SubHeading2 className="mb-2">{member.name}</SubHeading2>
                              {member.position && (
                                <p className="manrope-regular text-sm sm:text-base mb-3">
                                  {member.position}
                                </p>
                              )}
                              {member.bio && (
                                <p className="manrope-light text-base leading-[150%] line-clamp-6 mb-3">
                                  {member.bio}
                                </p>
                              )}
                              {(member.email || member.linkedin) && (
                                <div className="flex justify-center gap-2 sm:gap-3">
                                  {member.email && (
                                    <a
                                      href={`mailto:${member.email}`}
                                      className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-600/10 hover:bg-primary-600/20 rounded-full flex items-center justify-center transition-colors duration-200 group/icon"
                                      aria-label={`Email ${member.name}`}
                                    >
                                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 group-hover/icon:text-primary-700" />
                                    </a>
                                  )}
                                  {member.linkedin && (
                                    <a
                                      href={member.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-600/10 hover:bg-primary-600/20 rounded-full flex items-center justify-center transition-colors duration-200 group/icon"
                                      aria-label={`${member.name} LinkedIn profile`}
                                    >
                                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 group-hover/icon:text-primary-700" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  )
}
