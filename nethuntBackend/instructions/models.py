from django.db import models

# Create your models here.
class InstructionModel(models.Model):
    instruction = models.CharField(max_length = 200)
    class Meta:
        verbose_name = ("Instruction")
        verbose_name_plural = ("Instructions")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Instruction_detail", kwargs={"pk": self.pk})
