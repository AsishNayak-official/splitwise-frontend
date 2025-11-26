import { Users } from 'lucide-react'
import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const SplitHistory = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Split History</CardTitle>
        <CardAction>Your total balance: $46</CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full h-[25vh] overflow-y-auto">
          <div className="flex flex-row gap-2 border rounded-2xl px-3 py-2 items-center h-fit">
            <div className="border rounded-sm bg-gray-300 p-1.5 flex flex-col items-center justify-center text-xs">
              <span>26</span>
              <span>Nov</span>
            </div>
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <span className='text-sm'>Brian</span>
                <span className='text-xs'>You get back</span>
              </div>
              <div className="flex flex-row justify-between">
                <CardDescription className="text-xs">
                  You paid $100
                </CardDescription>
                <span className="text-sm font-semibold">$50</span>
              </div>
            </div>
          </div>                 
      </CardContent>
    </Card>
  )
}

export default SplitHistory