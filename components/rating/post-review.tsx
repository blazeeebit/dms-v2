'use client'
import React from 'react'
import { FormGenerator } from '../forms/generator'
import { useReview } from '@/hooks/use-dormitories-hook'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Loader } from '../loader'

type PostReviewProps = {
  dormId: string
  studentId: string
  review?: string
}

export const PostReview = ({ dormId, studentId, review }: PostReviewProps) => {
  const { register, errors, onPostReview, loading } = useReview(
    dormId,
    studentId
  )
  return (
    <Card className="p-5 col-span-2">
      {review ? (
        <div>
          <CardTitle className="font-bold text-lg">
            Thank you for posting a review
          </CardTitle>
          <CardDescription>{review}</CardDescription>
        </div>
      ) : (
        <form
          onSubmit={onPostReview}
          className="flex flex-col justify-between h-full"
        >
          <FormGenerator
            lines={15}
            inputType="textarea"
            register={register}
            errors={errors}
            placeholder="Write your review..."
            name="review"
            type="text"
            label="Post Review"
          />
          <Button variant="outline">
            <Loader loading={loading}>Post</Loader>
          </Button>
        </form>
      )}
    </Card>
  )
}
