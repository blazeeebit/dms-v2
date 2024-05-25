import {
  onCreateStudentRentData,
  onTotalDormBookings,
  onTotalDormsOwned,
  onTotalDormsRented,
  onTotalDormsRevenue,
} from '@/actions/dorms'
import { UserBarChart } from '@/components/bar-chart'
import { AnalyticCard } from '@/components/dashboard/analytics/card'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Building, DollarSign, GraduationCap, Pin } from 'lucide-react'
import React from 'react'

const OwnerDashboardPage = async ({ params }: { params: { id: string } }) => {
  const owned = await onTotalDormsOwned(params.id)
  const bookings = await onTotalDormBookings(params.id)
  const revenue = await onTotalDormsRevenue(params.id)
  const rented = await onTotalDormsRented(params.id)
  const dataset = await onCreateStudentRentData(params.id)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <AnalyticCard
        icon={<Building className="text-gray-500" />}
        value={owned || 0}
        label="Total Dorms"
      />
      <AnalyticCard
        icon={<Pin className="text-gray-500" />}
        value={bookings || 0}
        label="Total Reservations"
      />
      <AnalyticCard
        icon={<DollarSign className="text-gray-500" />}
        value={revenue ? revenue / 100 : 0}
        cash
        label="Total Payments"
      />
      <AnalyticCard
        icon={<GraduationCap className="text-gray-500" />}
        value={rented || 0}
        label="Total Students"
      />
      <Card className="col-span-1 lg:col-span-2 p-6">
        <CardContent className="p-0 flex flex-col gap-10">
          <CardTitle className="text-lg">Students Data</CardTitle>
          <UserBarChart data={dataset!} />
        </CardContent>
      </Card>
    </div>
  )
}

export default OwnerDashboardPage
