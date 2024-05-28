'use client'
import React from 'react'
import { Modal } from '../modal'
import { Card } from '../ui/card'
import { Tooltip } from '../tooltip'
import { usePromos } from '@/hooks/use-dormitories-hook'
import { FormGenerator } from '../forms/generator'
import { Button } from '../ui/button'
import { Loader } from '../loader'

type CreatePromosProps = {
  id: string
}

export const CreatePromos = ({ id }: CreatePromosProps) => {
  const { register, errors, onCreatePromo, loading } = usePromos(id)
  return (
    <Modal
      title="Create Promos"
      className="max-w-xl"
      description="Create promo offers for your dorms"
      trigger={
        <span>
          <Tooltip
            trigger={
              <Card className="py-2 flex gap-3 justify-center items-center cursor-pointer">
                Create Promos
              </Card>
            }
          >
            Create a promo
          </Tooltip>
        </span>
      }
    >
      <form onSubmit={onCreatePromo} className="flex flex-col gap-5">
        <FormGenerator
          register={register}
          errors={errors}
          name="name"
          placeholder="Promo code..."
          inputType="input"
          type="text"
          label="Promo Code"
        />
        <FormGenerator
          register={register}
          errors={errors}
          name="discount"
          placeholder="Discount amount..."
          inputType="input"
          type="text"
          label="Promo Discount"
        />
        <Button variant="outline">
          <Loader loading={loading}>Create Promo</Loader>
        </Button>
      </form>
    </Modal>
  )
}
