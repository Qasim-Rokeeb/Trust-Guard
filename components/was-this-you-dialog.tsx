"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface WasThisYouDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userName: string
}

export function WasThisYouDialog({ open, onOpenChange, userName }: WasThisYouDialogProps) {
  const [response, setResponse] = useState<"yes" | "no" | null>(null)
  const [explanation, setExplanation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      setResponse(null)
      setExplanation("")
    }, 1000)
  }

  const handleClose = () => {
    onOpenChange(false)
    setResponse(null)
    setExplanation("")
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Security Verification</span>
          </DialogTitle>
          <DialogDescription>
            We detected unusual activity on your account and need to verify if this was you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">Detected Activity:</h4>
            <p className="text-sm text-orange-800">
              Login attempt from a new device (iPhone 15) at 1:30 PM from an unknown location.
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Was this you, {userName}?</Label>
            <div className="flex space-x-3">
              <Button
                variant={response === "yes" ? "default" : "outline"}
                className={response === "yes" ? "bg-green-600 hover:bg-green-700" : ""}
                onClick={() => setResponse("yes")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Yes, this was me
              </Button>
              <Button variant={response === "no" ? "destructive" : "outline"} onClick={() => setResponse("no")}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                No, this wasn't me
              </Button>
            </div>
          </div>

          {response && (
            <div className="space-y-2">
              <Label htmlFor="explanation">
                {response === "yes"
                  ? "Please provide additional context (optional):"
                  : "Please describe what happened:"}
              </Label>
              <Textarea
                id="explanation"
                placeholder={
                  response === "yes"
                    ? "e.g., I was working from home and used my personal phone..."
                    : "e.g., I was not using my phone at that time, my device may be compromised..."
                }
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="min-h-20"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!response || isSubmitting}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
