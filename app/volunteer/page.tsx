// app/volunteers/page.tsx
'use client'
import { createClient } from "@/app/global/util/supabase/client";
import VolunteerTable from "@/components/Table/VolunteerTable";
import VolunteerFilterModal from "@/components/FilterModal/VolunteerFilterModal";
import { Volunteer } from "@/types/volunteer";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@mantine/core";
import { Skeleton } from "@mantine/core";

export default function Volunteers() {
    const [isFilterOpen, setFilterState] = useState(false);
    const [volunteers, setVolunteers] = useState<Volunteer[] | null>(null);
    const [loading, setLoading] = useState(true);

    const [initialVolunteers, setInitialVolunteers] = useState<Volunteer[] | null>(null);




    useEffect(() => {//useEffect to work with client siderendering, gets data on load

        const getVolunteers = async () => {

            const supabase = createClient();

            const { data, error } = await supabase
                .from('Volunteer')
                .select('*') as { data: Volunteer[] | null; error: any };

            if (error) {
                console.error('Error fetching volunteers:', error.message);
            } else {
                setVolunteers(data);
                setInitialVolunteers(data);
                console.log(initialVolunteers);
                setLoading(false);
            }
        };

        getVolunteers();

    }, [])

    if (loading) {
        return (
            <div className="p-8">
                <Skeleton height={40} mb="lg" />
                <Skeleton height={40} mb="lg" />
                <Skeleton height={40} mb="lg" />
            </div>
        );
    }
    if (!volunteers) {
        return (<div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600">ENothing to show here</h1>

        </div>);
    }

    //currently filters volunteer by 1 day, 
    // need to make changes to filter by 2,
    //  than can take day and time
    function applyFilter(filterData: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;

    }) {

        let filterDay: string | null = null;
        let days: string[] = [];


        for (const day in filterData) {

            const key = day as keyof typeof filterData;
            if (filterData[key]) {

                filterDay = day;
                //console.log(typeof(filterDay));
                console.log('Im pushing ' + { filterDay });
                days.push(filterDay);

                //console.log(filterDay);

            } else {
                console.log('Im not pushing ' + { filterDay });
            }
        }
        console.log(days);

        const filteredData = volunteers?.filter(volunteer => {
            let isAvailable = false;



            for (const day of days) {

                console.log(day);

                const ofDay = day as keyof typeof volunteer.availability;

                isAvailable = volunteer.availability[ofDay];

            }

            return isAvailable;
            // const ofDay = filterDay as keyof typeof volunteer.availability;
            // return volunteer.availability[ofDay];
        })
        //console.log("Filterdata");
        //console.log(filterData);
        //console.log(filteredData);

        setVolunteers(filteredData!);

    }

    function resetFilter() {
        //console.log(initialVolunteers);
        setVolunteers(initialVolunteers);

    }

    return (
        <div>
            <div className="py-4 flex-col">
                <div>
                    
                </div>
                <button className="px-4 py-2 rounded-md border transition-colors bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    onClick={() => setFilterState(true)}>
                    Apply Filters
                </button>
                

                <button className="px-4 py-2 rounded-md border transition-colors bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    onClick={() => resetFilter()}>
                    Reset Filters
                </button>
            </div>


            <VolunteerFilterModal
                isOpen={isFilterOpen}
                onExit={() => setFilterState(false)}
                onSubmit={applyFilter} />

            <VolunteerTable data={volunteers} />
        </div>
    );
}