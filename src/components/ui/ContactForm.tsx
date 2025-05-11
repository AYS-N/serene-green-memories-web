
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiry_type: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "送信完了",
        description: "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry_type: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium">
            お名前 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="山田 太郎"
            className="mt-1 w-full"
          />
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm font-medium">
            メールアドレス <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
            className="mt-1 w-full"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="block text-sm font-medium">
            電話番号
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="090-1234-5678"
            className="mt-1 w-full"
          />
        </div>

        <div>
          <Label htmlFor="inquiry_type" className="block text-sm font-medium">
            お問い合わせ内容 <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.inquiry_type}
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="お問い合わせ内容を選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="estate_cleanup">遺品整理について</SelectItem>
              <SelectItem value="lifetime_cleanup">生前整理について</SelectItem>
              <SelectItem value="special_cleaning">特殊清掃について</SelectItem>
              <SelectItem value="waste_collection">不用品回収について</SelectItem>
              <SelectItem value="price">料金について</SelectItem>
              <SelectItem value="other">その他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message" className="block text-sm font-medium">
            お問い合わせ詳細 <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="お問い合わせ内容の詳細をご記入ください"
            className="mt-1 w-full h-32"
          />
        </div>
      </div>

      <div className="text-right">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-green-600 hover:bg-green-700 px-8"
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
