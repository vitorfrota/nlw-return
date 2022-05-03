import { useState } from "react";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

import bugIconImg from '../../assets/bugIcon.svg';
import ideaIconImg from '../../assets/ideaIcon.svg';
import thoughtIconImg from '../../assets/thoughtIcon.svg';
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugIconImg,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaIconImg,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtIconImg,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback(){
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {
        feedbackSent 
          ? <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}  />
          : (
            <>
              {
                !feedbackType 
                ? <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                : <FeedbackContentStep 
                    feedbackType={feedbackType} 
                    onFeedbackRestartRequested={handleRestartFeedback} 
                    onFeedbackSent={()=> setFeedbackSent(true)}
                  />
              }
            </>
          )
      }
      <footer className="text-xs text-neutral-400">
        Feito com ❤ pela Rocketseat
      </footer>
    </div>
  )
}