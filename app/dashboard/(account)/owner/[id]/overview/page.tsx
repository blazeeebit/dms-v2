import {
  onCreateRevenueDataSet,
  onCreateStudentRentData,
  onGetAllRecentTransactions,
  onTotalDormBookings,
  onTotalDormsOwned,
  onTotalDormsRented,
  onTotalDormsRevenue,
} from '@/actions/dorms'
import { onGetUserLanguagePreference } from '@/actions/profile'
import { UserBarChart } from '@/components/bar-chart'
import { AnalyticCard } from '@/components/dashboard/analytics/card'
import { TabsMenu } from '@/components/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TabsContent } from '@/components/ui/tabs'
import { DMS_CONTENT } from '@/constants/language'
import { getMonthName } from '@/lib/utils'
import { Building, DollarSign, GraduationCap, Pin } from 'lucide-react'
import React from 'react'

const OwnerDashboardPage = async ({ params }: { params: { id: string } }) => {
  const owned = await onTotalDormsOwned(params.id)
  const bookings = await onTotalDormBookings(params.id)
  const revenue = await onTotalDormsRevenue(params.id)
  const rented = await onTotalDormsRented(params.id)
  const dataset = await onCreateStudentRentData(params.id)
  const revenueDataSet = await onCreateRevenueDataSet(params.id)
  const recentTransactions = await onGetAllRecentTransactions(params.id)
  const language = await onGetUserLanguagePreference(params.id)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <AnalyticCard
        icon={<Building className="text-gray-500" />}
        value={owned || 0}
        label={DMS_CONTENT.OWNER_OVERVIEW[language!].content.dorms}
      />
      <AnalyticCard
        icon={<Pin className="text-gray-500" />}
        value={bookings || 0}
        label={DMS_CONTENT.OWNER_OVERVIEW[language!].content.reservations}
      />
      <AnalyticCard
        icon={<DollarSign className="text-gray-500" />}
        value={revenue ? revenue / 100 : 0}
        cash
        label={DMS_CONTENT.OWNER_OVERVIEW[language!].content.payments}
      />
      <AnalyticCard
        icon={<GraduationCap className="text-gray-500" />}
        value={rented || 0}
        label={DMS_CONTENT.OWNER_OVERVIEW[language!].content.students}
      />
      <div className="col-span-1 lg:col-span-2">
        <TabsMenu
          header={[
            `${DMS_CONTENT.OWNER_OVERVIEW[language!].content.studentTable}`,
            `${DMS_CONTENT.OWNER_OVERVIEW[language!].content.revenueTable}`,
          ]}
        >
          <TabsContent
            value={DMS_CONTENT.OWNER_OVERVIEW[language!].content.studentTable}
            className="p-0 mt-5"
          >
            <Card className="w-full p-6">
              <CardContent className="p-0 flex flex-col gap-10">
                <CardTitle className="text-xl font-bold">
                  {DMS_CONTENT.OWNER_OVERVIEW[language!].content.studentTable}
                </CardTitle>
                <UserBarChart data={dataset!} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value={DMS_CONTENT.OWNER_OVERVIEW[language!].content.revenueTable}
            className="p-0 mt-5"
          >
            <Card className="w-full p-6">
              <CardContent className="p-0 flex flex-col gap-10">
                <CardTitle className="text-xl font-bold">
                  {DMS_CONTENT.OWNER_OVERVIEW[language!].content.revenueTable}
                </CardTitle>
                <UserBarChart cash data={revenueDataSet!} />
              </CardContent>
            </Card>
          </TabsContent>
        </TabsMenu>
      </div>
      <ScrollArea className="col-span-1 lg:col-span-2 h-full rounded-md border p-6">
        <CardTitle className="font-bold">
          {DMS_CONTENT.OWNER_OVERVIEW[language!].content.transactions}
        </CardTitle>
        <CardDescription>
          {DMS_CONTENT.OWNER_OVERVIEW[language!].content.recent}
        </CardDescription>
        <div className="flex flex-col gap-10 mt-10">
          {recentTransactions && recentTransactions.length ? (
            recentTransactions.map((tran) => (
              <div
                key={tran.id}
                className="w-full flex justify-between items-start"
              >
                <div>
                  <CardTitle className="text-lg font-bold lowercase">
                    {tran.studentName}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {tran.createdAt.getDate()}{' '}
                    {getMonthName(tran.createdAt.getMonth() + 1)}{' '}
                    {tran.createdAt.getFullYear()}
                  </CardDescription>
                </div>
                <div>
                  <CardTitle className="text-base font-bold">
                    {tran.Dormitories?.language[0].name}
                  </CardTitle>
                </div>
                <div className="flex flex-col items-end">
                  <CardTitle>${parseInt(tran.amount) / 100}</CardTitle>
                  <CardDescription className="lowercase">
                    {tran.type}
                  </CardDescription>
                </div>
              </div>
            ))
          ) : (
            <div>
              <CardDescription>You have no transactions</CardDescription>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default OwnerDashboardPage
