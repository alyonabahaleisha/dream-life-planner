// components/Roadmap/RoadmapAccordion.jsx
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Target, Flag, ListTodo, CalendarRange, Lightbulb, CheckCircle2, Heart } from 'lucide-react';
import { AccordionTriggerContent } from './AccordionTriggerContent';
import {
  OverviewSection,
  MilestonesSection,
  ActionPlanSection,
  TimelineSection,
  ResourcesSection,
  ActionItemsSection,
  ValuesSection
} from './sections';

const RoadmapAccordion = ({
  loadingStates,
  roadmap,
  milestones,
  actionPlan,
  timelineData,
  values,
  quickLinks,
  actionItems,
  completedItems,
  defaultValue,
  onSectionChange,
  onToggleItem
}) => {
  return (
    <Accordion 
      type="multiple" 
      defaultValue={defaultValue}
      className="w-full space-y-4"
    >
      {/* Overview Section */}
      <AccordionItem value="overview" className="border rounded-lg bg-white">
        <AccordionTrigger className="px-6">
          <AccordionTriggerContent 
            icon={Target} 
            title="Your Dream Life Overview"
            isLoading={loadingStates.roadmap}
            isReady={!loadingStates.roadmap && roadmap != null}
          />
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <OverviewSection isLoading={loadingStates.roadmap} content={roadmap} />
        </AccordionContent>
      </AccordionItem>

      {/* Values Section */}
      <AccordionItem value="values" className="border rounded-lg bg-white">
        <AccordionTrigger className="px-6">
          <AccordionTriggerContent 
            icon={Heart} 
            title="Values Transition"
            isLoading={loadingStates.values}
            isReady={!loadingStates.values && values != null}
          />
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <ValuesSection 
            isLoading={loadingStates.values}
            currentValues={values?.currentValues || []}
            desiredValues={values?.desiredValues || []}
            strategies={values?.strategies || []}
          />
        </AccordionContent>
      </AccordionItem>

      {/* Milestones Section */}
      <AccordionItem value="milestones" className="border rounded-lg bg-white">
        <AccordionTrigger className="px-6">
          <AccordionTriggerContent 
            icon={Flag} 
            title="Key Milestones"
            isLoading={loadingStates.milestones}
            isReady={!loadingStates.milestones && milestones.length > 0}
          />
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <MilestonesSection 
            isLoading={loadingStates.milestones} 
            milestones={milestones} 
          />
        </AccordionContent>
      </AccordionItem>

      {/* 30-Day Action Plan */}
      <AccordionItem value="action-plan" className="border rounded-lg bg-white">
        <AccordionTrigger className="px-6">
          <AccordionTriggerContent 
            icon={ListTodo} 
            title="30-Day Action Plan"
            isLoading={loadingStates.actionPlan}
            isReady={!loadingStates.actionPlan && actionPlan.length > 0}
          />
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <ActionPlanSection 
            isLoading={loadingStates.actionPlan} 
            plan={actionPlan} 
          />
        </AccordionContent>
      </AccordionItem>

      {/* Timeline Section */}
      <AccordionItem value="timeline" className="border rounded-lg bg-white">
        <AccordionTrigger className="px-6">
          <AccordionTriggerContent 
            icon={CalendarRange} 
            title="Timeline View"
            isLoading={loadingStates.timeline}
            isReady={!loadingStates.timeline && timelineData != null}
          />
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <TimelineSection 
            isLoading={loadingStates.timeline} 
            timelineData={timelineData} 
          />
        </AccordionContent>
      </AccordionItem>

      {/* Resources Section */}
      <AccordionItem value="resources" className="border rounded-lg bg-white">
        <AccordionTrigger className="px-6">
          <AccordionTriggerContent 
            icon={Lightbulb} 
            title="Quick Links & Resources"
            isLoading={false}
            isReady={true}
          />
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <ResourcesSection 
            quickLinks={quickLinks} 
            onSectionChange={onSectionChange} 
          />
        </AccordionContent>
      </AccordionItem>

      {/* Action Items */}
      <AccordionItem value="action-items" className="border rounded-lg bg-white">
        <AccordionTrigger className="px-6">
          <AccordionTriggerContent 
            icon={CheckCircle2} 
            title="Track Progress"
            isLoading={false}
            isReady={true}
          />
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <ActionItemsSection 
            items={actionItems}
            completedItems={completedItems}
            onToggleItem={onToggleItem}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RoadmapAccordion;