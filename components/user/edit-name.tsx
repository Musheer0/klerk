"use client"
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useUser } from '@/stores/useUser';
import User from './user-icon';
import EditNameForm from './edit-name-form';
import { AnimatePresence, motion } from 'framer-motion';

const EditName = () => {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <motion.div
            layout
            className='w-full border-b py-3 flex h-fit flex-col space-y-2'
        >
            <p className='font-semibold text-sm'>Profile</p>
            <div className='flex items-center justify-between w-full'>
                <div className="user flex items-center gap-2">
                    <User />
                    {isEditing ? (
                        <AnimatePresence>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    translateY: '-10px',
                                }}
                                animate={{
                                    opacity: 1,
                                    translateY: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    translateY: '-10px',
                                }}
                                transition={{
                                    duration: 0.4,
                                }}
                            >
                                <Button className='text-sm h-7 bg-secondary/50 hover:bg-secondary text-foreground border shadow-sm'>
                                    Change profile
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <motion.div
                            initial={{
                                opacity: 0,
                                translateY: '-10px',
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0,
                            }}
                            exit={{
                                opacity: 0,
                                translateY: '-10px',
                            }}
                            transition={{
                                duration: 0.4,
                            }}
                        >
                            <p>{user?.name || 'Unnamed User'}</p> {/* Provide a fallback name */}
                        </motion.div>
                    )}
                </div>
                {!isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className='bg-transparent hover:bg-foreground/5 text-primary hover:text-primary/80'
                    >
                        Update profile
                    </Button>
                )}
            </div>
            <AnimatePresence>
                {isEditing && (
                    <EditNameForm onclose={() => {
                        setIsEditing(false);
                    }} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EditName;
